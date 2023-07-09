import express from "express";
import { z } from "zod";
import { ConversationRepository, MessageRepository } from "./adapters/sqlite";
import { isAuthorized, auth } from "./auth";

const ConversationController = express.Router();

ConversationController.get("/conversations", isAuthorized, async (req, res) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = auth.verify(authToken);
    const conversations = (await ConversationRepository.findAll()).filter(
      (conversation) => conversation.ownerId === user.id
    );
    return res.json(conversations);
  } catch (error: any) {
    return res.status(400).json(error);
  }
});

ConversationController.get("/:id", isAuthorized, async (req, res) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = auth.verify(authToken);
    const conversation = await ConversationRepository.findById(
      req.params.id as string & { _brand: "ConversationId" }
    );
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    if (conversation.ownerId !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.json(conversation);
  } catch (error: any) {
    return res.status(400).json(error);
  }
});

ConversationController.post("/", isAuthorized, async (req, res) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = auth.verify(authToken);
    const newConversation = await ConversationRepository.create({
      ownerId: user.id,
    });
    return res.json(newConversation);
  } catch (error: any) {
    return res.status(400).json(error);
  }
});

ConversationController.get("/:id/messages", isAuthorized, async (req, res) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = auth.verify(authToken);
    const conversation = await ConversationRepository.findById(
      req.params.id as string & { _brand: "ConversationId" }
    );
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    if (conversation.ownerId !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const messages = await MessageRepository.findByConversationId(
      conversation.id
    );
    return res.json(messages);
  } catch (error: any) {
    return res.status(400).json(error);
  }
});

ConversationController.delete("/:id", isAuthorized, async (req, res) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = auth.verify(authToken);
    const conversation = await ConversationRepository.findById(
      req.params.id as string & { _brand: "ConversationId" }
    );
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    if (conversation.ownerId !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await ConversationRepository.delete(conversation.id);
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(400).json(error);
  }
});

ConversationController.post("/:id/messages", isAuthorized, async (req, res) => {
  // get bearer token from header
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const MessageSchema = z.object({
    content: z.string().min(1),
  });

  try {
    const user = auth.verify(authToken);
    const conversation = await ConversationRepository.findById(
      req.params.id as string & { _brand: "ConversationId" }
    );
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    if (conversation.ownerId !== user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const message = MessageSchema.parse(req.body);
    const newMessage = await MessageRepository.create({
      conversationId: conversation.id,
      content: message.content as string & { _brand: "MessageContent" },
      role: "user" as ("user" | "assistant" | "system") & {
        _brand: "MessageRole";
      },
    });
    return res.json(newMessage);
  } catch (error: any) {
    return res.status(400).json(error);
  }
});

ConversationController.patch(
  "/:id/messages/:messageId",
  isAuthorized,
  async (req, res) => {
    // get bearer token from header
    const authToken = req.headers.authorization?.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const MessageSchema = z.object({
      content: z.string().min(1),
    });

    try {
      const user = auth.verify(authToken);
      const conversation = await ConversationRepository.findById(
        req.params.id as string & { _brand: "ConversationId" }
      );
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      if (conversation.ownerId !== user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const message = await MessageRepository.findById(
        req.params.messageId as string & { _brand: "MessageId" }
      );
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      const messageUpdate = MessageSchema.parse(req.body);
      const updatedMessage = await MessageRepository.update(
        req.params.messageId as string & { _brand: "MessageId" },
        {
          content: messageUpdate.content as string & {
            _brand: "MessageContent";
          },
          role: "user" as ("user" | "assistant" | "system") & {
            _brand: "MessageRole";
          },
        }
      );
      return res.json(updatedMessage);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
);

ConversationController.delete(
  "/:id/messages/:messageId",
  isAuthorized,
  async (req, res) => {
    // get bearer token from header
    const authToken = req.headers.authorization?.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const user = auth.verify(authToken);
      const conversation = await ConversationRepository.findById(
        req.params.id as string & { _brand: "ConversationId" }
      );
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      if (conversation.ownerId !== user.id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const message = await MessageRepository.findById(
        req.params.messageId as string & { _brand: "MessageId" }
      );
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      await MessageRepository.delete(
        req.params.messageId as string & { _brand: "MessageId" }
      );
      return res.json({ success: true });
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
);

export { ConversationController };

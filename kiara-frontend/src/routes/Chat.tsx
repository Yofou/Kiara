import { ChatLayout } from '@/layouts/Chat'
import { ServerNav, ChannelNav, MessageList  } from '@/components/Chat'

export const Chat: React.FC = () => {
	return <ChatLayout>
		<ServerNav />
    <ChannelNav />
		<MessageList />
	</ChatLayout>
}

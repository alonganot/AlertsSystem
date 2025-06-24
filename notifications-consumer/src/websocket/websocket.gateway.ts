import { User } from '@Entities/User';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
   cors: true
})
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server

    private clients = new Map<string, Socket>()

    afterInit() {
        console.log("Web socket initialized")
    }

    handleConnection(client: Socket) {
        const clientId = client.handshake.query.clientId

        if (!clientId) {
            console.warn('Client connected without ID')
            client.disconnect(true)
        } else {
            this.clients.set(clientId as string, client)
            console.log(`client connected with id: ${clientId}`)
        }
        
    }

    handleDisconnect(client: Socket) {
        const clientId = [...this.clients.entries()].find(([_, socket]) => socket.id === client.id)?.[0];

        if (clientId) {
            this.clients.delete(clientId);
            console.log(`Client disconnected: ${clientId}`);
        }
    }

    sendMessageToClients(
        message: string, 
        filterFunction: (client: User) => boolean
    ) {
        const filteredClients = [...this.clients.entries()]
            .filter(([a, socket]) => filterFunction(a))?.[0];
    }
}
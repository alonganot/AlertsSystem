import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LineEvent } from 'src/types';

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

    sendMessageToClients(message: string, clientIds?: string[]) {       
        if (clientIds) {
            clientIds.forEach((clientId) => {
            const clientSocket = this.clients.get(clientId)
            
            if (clientSocket) {
                clientSocket.emit('kafka-message', message)
            } else {
                console.log(`Client ${clientId} not connected`)
            }
        })
        } else {
            this.server.emit('kafka-message', message)
        }
    }
}
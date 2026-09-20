import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ClientMemberService } from '../../application/client-member.service';
import { ClientMember } from '../../domain/client-member';

@Controller('clients')
export class ClientMemberController {
  constructor(private readonly clientService: ClientMemberService) {}

  @Get()
  async getAll(): Promise<ClientMember[]> {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ClientMember> {
    const client = await this.clientService.getClientById(id);
    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return client;
  }

  @Post()
  async create(@Body() client: ClientMember): Promise<ClientMember> {
    return this.clientService.createClient(client);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() clientData: Partial<ClientMember>): Promise<ClientMember> {
    const client = await this.clientService.updateClient(id, clientData);
    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado para actualizar`);
    }
    return client;
  }

  @Post(':id/renew')
  async renew(@Param('id') id: string): Promise<ClientMember> {
    const client = await this.clientService.renewMembership(id);
    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado para renovación`);
    }
    return client;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.clientService.deleteClient(id);
    return { message: `Cliente con ID ${id} eliminado correctamente` };
  }
}

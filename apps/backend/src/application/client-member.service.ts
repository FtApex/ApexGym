import { Injectable, Inject } from '@nestjs/common';
import { ClientMember } from '../domain/client-member';
import type { ClientMemberRepository } from '../domain/client-member.repository';
import { CLIENT_MEMBER_REPOSITORY_TOKEN } from '../domain/client-member.repository';
import type { MembershipPlanRepository } from '../domain/membership-plan.repository';
import { MEMBERSHIP_PLAN_REPOSITORY_TOKEN } from '../domain/membership-plan.repository';

@Injectable()
export class ClientMemberService {
  constructor(
    @Inject(CLIENT_MEMBER_REPOSITORY_TOKEN)
    private readonly repository: ClientMemberRepository,
    @Inject(MEMBERSHIP_PLAN_REPOSITORY_TOKEN)
    private readonly membershipRepository: MembershipPlanRepository,
  ) {}

  async getAllClients(): Promise<ClientMember[]> {
    return this.repository.findAll();
  }

  async getClientById(id: string): Promise<ClientMember | null> {
    return this.repository.findById(id);
  }

  async createClient(client: ClientMember): Promise<ClientMember> {
    return this.repository.save(client);
  }

  async updateClient(id: string, clientData: Partial<ClientMember>): Promise<ClientMember | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;
    const merged = Object.assign(existing, clientData);
    return this.repository.save(merged);
  }

  /**
   * Extiende la membresía por la duración del plan contratado.
   *
   * Si la membresía sigue vigente se encadena a su fecha de vencimiento; si
   * ya venció, el nuevo periodo arranca hoy, de modo que renovar siempre
   * deja al socio activo.
   */
  async renewMembership(clientId: string): Promise<ClientMember | null> {
    const client = await this.repository.findById(clientId);
    if (!client) return null;

    const plan = await this.membershipRepository.findById(client.membershipId);
    const durationMonths = plan?.durationMonths ?? 1;

    const today = new Date();
    const currentExpiry = new Date(client.expiryDate);
    const startFrom = currentExpiry > today ? currentExpiry : today;
    startFrom.setMonth(startFrom.getMonth() + durationMonths);

    client.status = 'ACTIVE';
    client.renewalsCount += 1;
    client.expiryDate = startFrom.toISOString().split('T')[0];
    return this.repository.save(client);
  }

  async deleteClient(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

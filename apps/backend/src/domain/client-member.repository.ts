import { ClientMember } from './client-member';

export interface ClientMemberRepository {
  findAll(): Promise<ClientMember[]>;
  findById(id: string): Promise<ClientMember | null>;
  save(client: ClientMember): Promise<ClientMember>;
  delete(id: string): Promise<void>;
}

export const CLIENT_MEMBER_REPOSITORY_TOKEN = Symbol('ClientMemberRepository');

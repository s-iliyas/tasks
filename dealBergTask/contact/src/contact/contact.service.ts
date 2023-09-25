import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactDataFormDto, ContactFormDto } from './contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async getContactByEmail(body: ContactFormDto) {
    return await this.prisma.contact.findMany({
      where: { email: body.email },
    });
  }
  async getContactByPhoneNumber(body: ContactFormDto) {
    return await this.prisma.contact.findMany({
      where: { phoneNumber: body.phoneNumber },
    });
  }
  async addContact(data: ContactDataFormDto) {
    return await this.prisma.contact.create({ data });
  }
  async getContact(body: ContactFormDto) {
    return await this.prisma.contact.findMany({
      where: { phoneNumber: body.phoneNumber, email: body.email },
    });
  }
  async getContactForLinkedIds(id) {
    return await this.prisma.contact.findMany({
      where: { linkedId: id },
    });
  }
  async getContactById(id) {
    return await this.prisma.contact.findMany({
      where: { id },
    });
  }
  async updateContact(id, data) {
    return await this.prisma.contact.update({
      where: { id },
      data,
    });
  }
}

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ContactFormDto } from './contact.dto';
import { ContactService } from './contact.service';
import getResponseObj from 'utils/getResopnseObj';
import { ResponseData } from './contact.interface';

@Controller('')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Get()
  getContactApi() {
    return { message: 'Contact API working...' };
  }

  @Post('identify')
  async addContact(@Body() body: ContactFormDto) {
    try {
      let responseData: ResponseData;
      const oldContact = await this.contactService.getContact(body);
      if (oldContact.length > 0) {
        // get contacts
        if (oldContact[0].linkedId) {
          // if secondary present with other primary
          const primaryObj = await this.contactService.getContactById(
            oldContact[0].linkedId,
          );
          const secondaryObj = await this.contactService.getContactForLinkedIds(
            oldContact[0].linkedId,
          );
          responseData = getResponseObj(primaryObj, secondaryObj);
        } else {
          // if seccondary present with current primary
          const secondaryObj = await this.contactService.getContactForLinkedIds(
            oldContact[0].id,
          );
          responseData = getResponseObj(oldContact, secondaryObj);
        }
      } else {
        const { email, phoneNumber } = body;
        if (email && phoneNumber) {
          const emailObj = await this.contactService.getContactByEmail(body);
          const phoneNumberObj =
            await this.contactService.getContactByPhoneNumber(body);
          const emailPrimaryObj = emailObj.filter(
            (o) => o.linkPrecedence === 'primary',
          );
          const phoneNumberPrimaryObj = phoneNumberObj.filter(
            (o) => o.linkPrecedence === 'primary',
          );
          let id = emailPrimaryObj[0]?.id || phoneNumberPrimaryObj[0]?.id;
          if (emailObj.length === 0 && phoneNumberObj.length === 0) {
            const newObj = await this.contactService.addContact({
              email,
              phoneNumber,
              linkedId: null,
              linkPrecedence: 'primary',
            });
            responseData = getResponseObj([newObj]);
          }
          //  else if (
          //   emailPrimaryObj[0]?.phoneNumber?.length === 0 ||
          //   phoneNumberPrimaryObj[0]?.email?.length === 0
          // ) {
          //   const data: { email: string; phoneNumber: string } = {
          //     email,
          //     phoneNumber,
          //   };
          //   const updateObj = await this.contactService.updateContact(id, data);
          //   const secondaryObj =
          //     await this.contactService.getContactForLinkedIds(id);
          //   responseData = getResponseObj([updateObj], secondaryObj);
          // }
          else if (
            emailPrimaryObj[0]?.phoneNumber !== phoneNumber ||
            phoneNumberPrimaryObj[0]?.email !== email
          ) {
            const data: {
              email: string;
              phoneNumber: string;
              linkedId: number;
              linkPrecedence: 'secondary';
            } = {
              email,
              phoneNumber,
              linkedId: 0,
              linkPrecedence: 'secondary',
            };
            id =
              id ||
              emailObj.map((z) => z.linkedId).filter((x) => !!x)[0] ||
              phoneNumberObj.map((z) => z.linkedId).filter((x) => !!x)[0];
            data.linkedId = id;
            data.linkPrecedence = 'secondary';
            await this.contactService.addContact(data);
            const secondaryObj =
              await this.contactService.getContactForLinkedIds(id);
            const primaryObj = await this.contactService.getContactById(id);
            responseData = getResponseObj(primaryObj, secondaryObj);
          }
        } else if (email && !phoneNumber) {
          const obj = await this.contactService.getContactByEmail(body);
          if (obj.length === 0) {
            // if no contact with this email
            const newObj = await this.contactService.addContact({
              email,
              phoneNumber,
              linkedId: null,
              linkPrecedence: 'primary',
            });
            responseData = getResponseObj([newObj]);
          } else {
            const primaryObj = obj.filter(
              (x) => x.linkPrecedence === 'primary',
            );
            const secondaryObj = obj.filter(
              (x) => x.linkPrecedence === 'secondary',
            );
            responseData = getResponseObj(primaryObj, secondaryObj);
          }
        } else if (!email && phoneNumber) {
          const obj = await this.contactService.getContactByPhoneNumber(body);
          if (obj.length === 0) {
            const newObj = await this.contactService.addContact({
              email,
              phoneNumber,
              linkedId: null,
              linkPrecedence: 'primary',
            });
            responseData = getResponseObj([newObj]);
          } else {
            const primaryObj = obj.filter(
              (x) => x.linkPrecedence === 'primary',
            );
            const secondaryObj = obj.filter(
              (x) => x.linkPrecedence === 'secondary',
            );
            responseData = getResponseObj(primaryObj, secondaryObj);
          }
        }
      }
      return responseData;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

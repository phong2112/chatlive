import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailActivationUserDto } from 'src/users/dto/email-user.dto';
@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendResetPasswordLink(payload?: EmailActivationUserDto) {
    const { email, from, subject, activationLink } = payload;
    this.mailService.sendMail({
      from: from || '',
      to: email || '',
      subject: subject,
      template: 'activation',
      context: {
        email: email,
        activationLink: activationLink,
      },
    });
  }
}

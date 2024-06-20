import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageP } from 'src/app/models/messageP.model';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chatp',
  templateUrl: './chatp.component.html',
  styleUrls: ['./chatp.component.scss']
})
export class ChatpComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  theUser: User;
  messages: MessageP[] = [];
  newMessage: string = '';
  messageSubscription: Subscription;
  userSubscription: Subscription;
  urlPhoto: string;

  constructor(private webSocketService: WebSocketService, private theSecurityService: SecurityService, ) { }

  getSecurityService() {
    return this.theSecurityService;
  }

  ngOnInit() {
    console.log('ChatpComponent.ngOnInit');
    this.messageSubscription = this.webSocketService.onMessage().subscribe((msg: MessageP) => {
      this.messages.push(msg);
      this.scrollToBottom();
    });
    this.userSubscription = this.theSecurityService.getUser().subscribe(data => {
      this.theUser = data;
    });
    this.getUrlPhoto();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message: MessageP = {
        content: this.newMessage,
        user_id: this.theUser._id , 
        timestamp: new Date().toLocaleTimeString()
      };
      this.webSocketService.sendMessage(message);
      this.newMessage = '';
    }
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getUrlPhoto() {
    this.urlPhoto = this.theSecurityService.getGithubProfileImage(this.theUser.user_github);
  }


}

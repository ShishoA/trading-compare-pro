import { Component, trigger, transition, animate, keyframes, style } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthDataProvider } from '../../providers/auth-data/auth-data';
import { GlobalProvider } from '../../providers/global/global';


@IonicPage({
  name: "profile"
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  animations: [
    trigger("changeBackgroundColor", [
      transition("falling1 => falling, falling => falling1,raising => falling,raising => falling1,raising1 => falling,raising1 => falling1,none => falling,none => falling1",
        [
          animate("0.6s",
            keyframes([
              style({ color: "#e34c47", offset: 0 }),
              style({ backgroundColor: "#e34c47", offset: 0, opacity: 0.5 }),
              style({ backgroundColor: "#2b2b2b", offset: 1 })
            ])
          )]
      ),
      transition("raising1 => raising, raising => raising1,falling => raising,falling => raising1,falling1 => raising,falling1 => raising1,none => raising1,none => raising",
        [
          animate("0.6s",
            keyframes([
              style({ backgroundColor: "#91c353", opacity: 0.5 }),
              style({ backgroundColor: "#2b2b2b", })
            ])
          )]
      )
    ])
  ]
})
export class ProfilePage {

  posts_length=0;
  posts: any[] = [];
  is_follow = false;
  user_profile: any = {};
  selected_segment = "POSTS";
  profile:any
  watchlist_length: number = 0;
  followers_length=0;
  following_length= 0;

  constructor(
    public globalProvider: GlobalProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    ) {
    var a = this.navParams.get("user");
    
    this.globalProvider.get_all_information(a._id).then((data)=>{
        console.log(data);
        
     this.profile = data;
     this.posts_length =  this.profile.posts.length;
     this.watchlist_length =  this.profile.watchlist.length;
     this.followers_length =  this.profile.following.length;
     this.following_length =  this.profile.followers.length;
      console.log(this.profile);
      
    })


  }

  ionViewDidLoad() {

  }
  foo() {
    console.log(this.globalProvider.watchlists);
  }

  change_segment(segment) {
    this.selected_segment = segment;
  }

  goToDetails(watchlist: any) {
    let page: string = ""
    switch (watchlist.type) {
      case "STOCK":
        page = "item-details-stock";
        break;
      case "FOREX":
        page = "item-details-forex";
        break;
      case "CRYPTO":
        page = "item-details-crypto";
        break;

      default:
        break;
    }

    this.navCtrl.push(page, {
      item: watchlist,
    })
  }


}

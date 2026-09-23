/* LIX CITY Notifications Module - v0.59 */
window.LixNotifications={
  list(){
    const s=window.S||{};
    return Array.isArray(s.notifications)?s.notifications:[];
  },
  push(title,message){
    if(!window.S)return;
    S.notifications=Array.isArray(S.notifications)?S.notifications:[];
    S.notifications.unshift({title,message,time:Date.now(),read:false});
    S.notifications=S.notifications.slice(0,20);
    try{if(typeof save==="function")save()}catch(e){}
  },
  unread(){return this.list().filter(x=>!x.read).length;}
};

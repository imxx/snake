define([],function(){var e=document.querySelector(".main"),t=e.getBoundingClientRect();e.style.width=Math.round(t.width)+"px",e.style.height=Math.round(t.height)+"px";var d=document.querySelector(".game-board"),i=d.getBoundingClientRect(),u={};return u.speedDefault=9,u.cellRadiusDefault=20,u.foodRadiusDefault=15,u.speed=9,u.cellRadius=20,u.foodRadius=15,u.board={el:d,width:Math.round(i.width),height:Math.round(i.height),top:i.top,left:i.left},u.cellRadius=20,u.foodWorth=20*u.speed,u.setDefaults=function(){this.speed=this.speedDefault,this.cellRadius=this.cellRadiusDefault,this.foodRadius=this.foodRadiusDefault},u});
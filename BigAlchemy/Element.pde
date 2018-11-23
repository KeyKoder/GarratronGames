class Element{
  String name;
  PImage image;
  float x=0,y=0;
  Element(PImage img, String elemname){
    image=img;
    name=elemname;
  }
  
  float show(){
    if(textWidth(name)/2>32){
      image(image,x+textWidth(name)/4,y,32,32);
    }else{
      image(image,x,y,32,32);
    }
    text(name,x,y+42);
    return textWidth(name);
  }
  
  void setPos(float x,float y){
    this.x=x;
    this.y=y;
  }
  
  float getTextWidth(){
    return textWidth(name);
  }
}

class ElementLibrary{
  ArrayList<Element> list;
  int textYPos=0;
  ElementLibrary(ArrayList<Element> elemlist){
    list=elemlist;
  }
  
  void show(){
    fill(100);
    rect(width-textWidth(biggestWord)-32-20,0,width-(width-textWidth(biggestWord)-32-8-7),height);
    fill(255);
    textYPos=0;
    for (int i = 0; i < list.size(); i++) {
      textYPos+=16+8;
      //image(elementImages.get(i),(32+16)*i,0,32,32);
      //text(elementNames.get(i),(32+16)*i,40);
      image(list.get(i).image,width-textWidth(biggestWord)-32-8-7,(32+16)*i,32,32);
      text(list.get(i).name,width-textWidth(biggestWord)-7,textYPos);
      textYPos+=32-8;
    }
  }
}

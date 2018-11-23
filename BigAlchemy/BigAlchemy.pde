JSONArray elementJson;
ArrayList<Element> elements;
ArrayList<Element> workspaceElements;
ElementLibrary library;
String biggestWord="";

void setup(){
  fullScreen();
  elementJson=loadJSONArray("elements.json");
  elements=new ArrayList<Element>(elementJson.size());
  workspaceElements=new ArrayList<Element>(elementJson.size());
  for (int i = 0; i < elementJson.size(); i++) {
    JSONObject element = elementJson.getJSONObject(i);
    PImage image=loadImage(element.getString("image"));
    //elementImages.add(loadImage("data/"+imagePath));
    String name=element.getString("name").length()>17 ? element.getString("name").subSequence(0,17)+"..." : element.getString("name");
    //elementNames.add(name);
    elements.add(new Element(image, name));
    if(name.length()>biggestWord.length()){
      biggestWord=name;
    }
  }
  library=new ElementLibrary(elements);
}

void draw(){
  background(0);
  library.show();
  if(workspaceElements.size()>0){
    for (int i = 0; i < workspaceElements.size(); i++) {
      workspaceElements.get(i).show();
    }
  }
}

void mouseClicked(){
  int textY=0;
  for (int i = 0; i < elements.size(); i++) {
    if(mouseX>width-textWidth(biggestWord)-32-8-7 && (mouseY>textY && mouseY<textY+32)){
      workspaceElements.add(elements.get(i));
      int k=workspaceElements.indexOf(elements.get(i));
      workspaceElements.get(k).setPos(random(width/2),random(height-64));
    }
    textY+=32+16;
  }
}

void mouseDragged(){
  for (int i = 0; i < workspaceElements.size(); i++) {
    
  }
}

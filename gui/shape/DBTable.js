
dbModel.shape.DBTable = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "dbModel.shape.DBTable",
	
    init : function()
    {
        this._super();
        
        // just some color attributes for the rendering/gradient
        this.setBackgroundColor("#dbddde");
        this.setColor("#d7d7d7");
        this.setStroke(1);
        this.setRadius(3);

        this.entities = new draw2d.util.ArrayList();
        this.header = new draw2d.shape.layout.VerticalLayout();
        
        this.header.setStroke(0).setRadius(this.getRadius());
        this.header.setBackgroundColor("#f7f7f7");

        this.classLabel = this.createLabel("ClassName")
                                 .setPadding(10)
                                 .setFontColor("#4a4a4a");
        this.header.addFigure(this.classLabel);
        
        this.sterotypeLabel = this.createLabel("<<Stereotype>>")
                                 .setFontColor("#5856d6");
        this.header.addFigure(this.sterotypeLabel);
                                 
        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.addFigure(this.header);
    },
     
 
    addEntity: function(index, entity){
	   	var label =new draw2d.shape.basic.Label(entity.text);
		label.setStroke(0);
		label.setRadius(0);
		label.setBackgroundColor(null);
		label.setPadding(5);
		label.setFontColor("#4a4a4a");

        label.createPort("input");
        label.inputPorts.data[0].name = "input"+index;
        
        label.createPort("output");
        label.outputPorts.data[0].name = "output"+index;

	    this.addFigure(label);
	   
	    this.entities.add(label);
	    return label;
    },
     
    removeFigure: function(figure){
        this._super(figure);
        this.entities.remove(figure);
        
        return this;
    },
    
     /**
      * @method
      * help method to create some labels
      * 
      * @param {String} txt the label to display
      * @returns {draw2d.shape.basic.Label}
      */
     createLabel: function(txt){
    	 var label =new draw2d.shape.basic.Label(txt);
    	 label.setStroke(0);
    	 label.setRadius(0);
    	 label.setBackgroundColor(null);
    	 label.setPadding(5);
    	    
    	 return label;
     },
     
     setName: function(name){
         this.classLabel.setText(name);
     },
     
     
     /**
      * @method 
      * Return an objects with all important attributes for XML or JSON serialization
      * 
      * @returns {Object}
      */
    getPersistentAttributes : function()
    {
        var memento= this._super();

        memento.entities   = [];
        this.entities.each(function(i,e){
            memento.entities.push({
                text:e.getText(),
                id: e.id,
                inputPort: e.getInputPorts().data[0].name,
            });
        });
        
        return memento;
    },
     
     /**
      * @method 
      * Read all attributes from the serialized properties and transfer them into the shape.
      * 
      * @param {Object} memento
      * @return
      */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        if(typeof memento.entities !== "undefined"){
            $.each(memento.entities, $.proxy(function(i,e){
                var entity =this.addEntity(i, e);
                entity.id = e.id;
            },this));
        }
          
        return this;
    }  

});

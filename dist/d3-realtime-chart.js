class t{constructor(t,i,s){let{n:a,duration:e,margin:h,width:r,height:n,ticks:l,gridx:d,gridy:o}=i;this.id=t,this.data=d3.range(a).map((()=>0)),this.xDomain=s,this.lastIndex=s[1],this.n=a,this.duration=e,this.margin=h,this.width=r-h.right,this.height=n-h.top-h.bottom,this.gridx=d,this.gridy=o,this.ticks=l,this.initialize()}initialize(){const t=new Date(Date.now()-this.duration);this.timeseries=d3.time.scale().domain([t-this.lastIndex*this.duration,t-this.duration]).range([0,this.width]),this.x=d3.scale.linear().domain(this.xDomain).range([0,this.width]),this.y=d3.scale.linear().domain([d3.min(this.data),d3.max(this.data)]).range([this.height,0]),this.rootElement=d3.select(this.id).append("p").append("svg").attr("width",this.width+this.margin.left+this.margin.right).attr("height",this.height+this.margin.top+this.margin.bottom).append("g").attr("transform","translate("+this.margin.left+","+this.margin.top+")"),this.rootElement.append("defs").append("clipPath").attr("id","clip").append("rect").attr("width",this.width).attr("height",this.height),this.axisY=this.rootElement.append("g").attr("class","y axis").call(this.y.axis=d3.svg.axis().scale(this.y).ticks(this.ticks).orient("left")),this.axisX=this.rootElement.append("g").attr("class","x axis").attr("transform","translate(0,"+this.height+")").call(this.timeseries.axis=d3.svg.axis().scale(this.timeseries).orient("bottom")),this.transition=d3.select({}).transition().duration(this.duration).ease("linear")}updateAxis(){const t=new Date;if(this.timeseries.domain([t-this.lastIndex*this.duration,t-this.duration]),this.axisX.call(this.timeseries.axis),this.y.domain([d3.min(this.data),d3.max(this.data)]),this.axisY.call(this.y.axis),this.gridx){const t=this.axisX.selectAll("g.tick"),i=this.height;t.each((function(){const t=d3.select(this);t.selectAll(".grid-x").remove(),t.append("line").attr("class","grid-x").attr("y1",0).attr("y2",-i)}))}if(this.gridy){const t=this.axisY.selectAll("g.tick"),i=this.width;t.each((function(){const t=d3.select(this);t.selectAll(".grid-y").remove(),t.append("line").attr("class","grid-y").attr("x1",0).attr("x2",i)}))}}}var i={LineChart:class extends t{constructor(t,i,s,a="linear"){super(t,s,"linear"===a?[0,s.n-1]:[1,s.n-2]),this.getCurrent=i,this.interpolation=a,this.render()}render(){this.line=d3.svg.line().interpolate(this.interpolation).x(((t,i)=>this.x(i))).y((t=>this.y(t))),this.path=this.rootElement.append("g").attr("clip-path","url(#clip)").append("path").datum(this.data).attr("class","line").attr("d",this.line),this.tick()}tick(){this.transition=this.transition.each((()=>{if(!this.getCurrent)return;this.data.push(this.getCurrent()),this.updateAxis();const t="linear"===this.interpolation?this.x(-1):this.x(0);this.path.attr("d",this.line).attr("transform",null).transition().attr("transform",`translate(${t})`),this.data.shift()})).transition().each("start",(()=>this.tick()))}stop(){this.getCurrent=null}},BarChart:class extends t{constructor(t,i,s){super(t,s,[0,s.n-1]),this.getCurrent=i,this.render()}render(){this.bars=this.rootElement.append("g").attr("class","bars").attr("clip-path","url(#clip)").selectAll(".bar").data(this.data).enter().append("rect").attr("class","bar").attr("x",((t,i)=>this.x(i))).attr("y",(t=>this.y(t))).attr("width",this.width/this.n-1).attr("height",(t=>this.height-this.y(t))),this.tick()}tick(){this.transition=this.transition.each((()=>{this.getCurrent&&(this.data.push(this.getCurrent()),this.updateAxis(),this.x.domain([this.x.domain()[0]+1,this.x.domain()[1]+1]),this.bars=this.bars.data(this.data),this.bars.enter().append("rect").attr("class","bar").attr("x",((t,i)=>this.x(i))).attr("y",(t=>this.y(t))).attr("width",this.width/this.n-1).attr("height",(t=>this.height-this.y(t))),this.bars.transition().duration(this.duration).attr("x",((t,i)=>this.x(i))))})).transition().each("start",(()=>this.tick()))}stop(){this.getCurrent=null}},AreaChart:class extends t{constructor(t,i,s,a="linear"){super(t,s,[0,s.n-1]),this.getCurrent=i,this.interpolation=a,this.render()}render(){this.area=d3.svg.area().interpolate(this.interpolation).x(((t,i)=>this.x(i))).y0(this.y(0)).y1((t=>this.y(t))),this.path=this.rootElement.append("g").attr("clip-path","url(#clip)").append("path").datum(this.data).attr("class","area").attr("d",this.area),this.leftLabel=this.rootElement.append("text").attr("x",0).attr("y",-7).attr("class","chart-label left-label"),this.rightLabel=this.rootElement.append("text").attr("x",this.width-10).attr("y",-7).attr("class","chart-label right-label"),this.tick()}tick(){this.transition=this.transition.each((()=>{if(!this.getCurrent)return;const t=this.getCurrent();this.data.push(t.value),t.leftText&&this.leftLabel.text(t.leftText),t.rightText&&this.rightLabel.text(t.rightText),this.updateAxis();const i=this.x(-1);this.path.attr("d",this.area).attr("transform",null).transition().attr("transform",`translate(${i})`),this.data.shift()})).transition().each("start",(()=>this.tick()))}stop(){this.getCurrent=null}}};export{i as default};

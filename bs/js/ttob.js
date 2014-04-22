function ttob(){
	var y= document.getElementById('txt').value;
	var p="";
	var array = new Array(50);
	for(var i=0; i<26;i++){
		array[i]=-1;
	}
	for(var i=0;i<y.length;i++){
		
		array[Math.floor((y.charCodeAt(i))/10)]=1;
	}
	var num=0
	var spos=-1
	p+="++++++++++[";
	for(var i=0;i<26;i++){
		if(array[i]==1){
			if(spos==-1) spos=i;
			p+='>';
			for(var j=0;j<i;j++){
				p+='+';
			}
			num+=1;
		}
	}
	for(var i=0;i<num;i++){
		p+='<'
	}
	p+="-]>";
	for(var i=0;i<26;i++){
		if( array[i]==1){
			array[i]=i*10;
		}
	}
	for(var i=0;i<y.length;i++){
		var temp= Math.floor(y.charCodeAt(i)/10);
		while(spos!=temp){
			if(spos>temp){
				spos -=1;
				if(array[spos]!=-1) p+='<';
			}
			else{
				spos +=1;
				if(array[spos]!=-1) p+='>';
			}
		}
		temp =y.charCodeAt(i);
		while(temp!=array[spos]){
			if(array[spos]>temp){
				array[spos]-=1;
				p+='-';
			}
			else{
				array[spos]+=1;
				p+='+';
			}
		}
		p+='.';
	}
	document.getElementById('bf').value=p;
}


function btot(){
	var y=document.getElementById('bf').value;
	var input=document.getElementById('is').value;
	var inputpos=0
	var p=""
	var out=""
	for( var i=0;i<y.length;i++){
		if(y[i]=='.'||y[i]==','||y[i]=='<'||y[i]=='>'||y[i]=='['||y[i]==']'||y[i]=='-'||y[i]=='+')
			p+=y[i];
	}
	var memory=[]
	var pos=0
	memory[pos]=0
	var flag=0
	var mrm = 0
	
	for(var i=0;i<p.length;i++){
		if(p[i]=='[') mrm++;
		else if(p[i]==']')
			mrm--;

		if(mrm<0) flag=1;
	}
	if(flag==1 || mrm != 0){
		document.getElementById('txt').value="Error !!!";
		return;		
	}

	var stack=[]
	var spos=1
	flag=0;
	for(var i=0;i<p.length;i++){
		if(p[i]==',' && inputpos>=q.length){
			flag=1;
			break;
		}
		if(p[i]=='<' && pos==0){
			flag=1;
			break;
		}
		if(p[i]=='['){
			stack[spos]=i+1;
			spos+=1;
			continue;
		}
		if(p[i]==']'){
			if(memory[pos]==0){
				spos-=1;
				continue;
			}
			i= stack[spos-1]-1;
			continue;
		}
		if(p[i]=='+'){
			memory[pos]=(memory[pos]+1)%256;
			continue;
		}
		if(p[i]=='-'){
			memory[pos]=(memory[pos]-1)%256;
			continue;
		}
		if(p[i]=='>'){
			pos+=1;
			if(memory[pos]==undefined){
				memory[pos]=0;
			}
			continue;
		}
		if(p[i]=='<'){
			pos-=1;
			continue;
		}
		if(p[i]=='.'){
			out+=String.fromCharCode(memory[pos]);
			continue;
		}
		if(p[i]==','){
			memory[pos]=input.charCodeAt(inputpos);
			inputpos+=1;
		}
	}
	if(flag!=0){
		document.getElementById('txt').value="Error!!!";
		return;			
	}
	document.getElementById('txt').value=out;
		return;		
	
}
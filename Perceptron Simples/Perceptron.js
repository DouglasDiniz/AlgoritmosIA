function Perceptron(){	
	this.bias = 0;
	this.pesos = [];
	this.taxaAprendizado = 0.25;
	this.maximoEpocas = 500;
	this.historicoPesos = new Array();
	
	this.setTaxaAprendizado = function(taxaAprendizado){
		this.taxaAprendizado = taxaAprendizado;
	};
	
	this.getHistoricoPesos = function(){
		return this.historicoPesos;
	};
	
	this.pesagemInicial = function(tamanho){		
		for(var i = 0; i < tamanho; i++){
			this.pesos[i] = Math.random();
		}
	};
	
	this.bipolar = function(u){
		return (u > 0 ? 1 : 0) 
	}
	
	this.treinar = function(dados){
		for(var i=0; i < dados.length; i++){
			dados[i].inputs = dados[i].inputs.concat(this.bias);
		}
		
		this.pesagemInicial(dados[0].inputs.length);
		
		console.log('Entradas:');
		console.log(dados);
		
		var epoca = 0;
		var erro = true;
		
		while(erro && epoca < this.maximoEpocas){
			this.historicoPesos.push( this.pesos.concat() );
			
			erro = false;
			var diferenca = 0;
			
			for(var i=0; i < dados.length; i++){
				var resultado =  this.executar(dados[i].inputs);
				
				if(resultado != dados[i].output){
					erro = true;
					diferenca = dados[i].output - resultado;
					this.recalcularPesos(diferenca, dados[i].inputs);
				}else{
					erro = false;
				}
			}
			
			epoca++;
		}
		
		console.log('Pesos:');
		console.log(this.historicoPesos);
	};
	
	this.recalcularPesos = function(diferenca, inputs){
		for(var j=0; j < this.pesos.length; j++){
			this.pesos[j] = this.pesos[j] + this.taxaAprendizado * diferenca * inputs[j];
		}
	};
	
	this.executar = function(inputs){
		var somatorio = 0;
		
		for(var j=0; j < inputs.length; j++){			
			somatorio += inputs[j] * this.pesos[j];
		}		
		
		return this.bipolar(somatorio);		
	};
}
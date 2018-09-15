Perceptron = function(){	
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
	
	this.sigmoid = function(u){
		return (1 / (1 - Math.exp(-1*u)));
	};	
	
	this.bipolar = function(u){
		return (u > 0 ? 1 : 0) 
	}
	
	this.treinar = function(dados){
		this.pesagemInicial(dados[0].inputs.length);
		
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
		
		somatorio += this.bias;
		
		return this.bipolar(somatorio);		
	};
}
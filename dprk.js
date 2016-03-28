/**
 * 
 * DPRK, Democratic People's Republic of Korea. 
 *
 * Yes, gain a full control of your application like how Kims would, but in MVC fashion. 
 *
 */
var DPRK = {

	model : {

		base : function() { 

			var base = {};

		},

		list : function() {

			var List = {},
		 	_nodes   = [];

		 	List.add = function( a ) {

		 		_nodes.push( a );

		 	}

		 	List.get = function( a ) {

		 		if( a === undefined ) {

		 			return _nodes;

		 		}

		 		return _nodes[ a ];

		 	}

		 	List.delete = function( a ) {

		 		_nodes.splice( a, 1 );

		 	}

		 	List.loop = function( a ) {

		 		for( var i = 0, max = _nodes.length; i < max; i++ ) {

		 			a( _nodes[ i ] );

		 		}

		 	}

		 	return List;

		

		}

	},

	view : {

		base : function() {

		}

	},
	
	controller : {


	},

	util : {

		subject : function() {

			var Subject = {},
		 	_observers = new List(),
		 	_state;

		 	Subject.getState = function() {

		 		return _state;

		 	}

		 	Subject.setState = function( a ) {

		 		_state = a;
		 		this.update();

		 	}

		 	Subject.add = function( a ) {

		 		observers.add( a );

		 	}

		 	Subject.update = function() {

		 		_observers.loop( function( ob ) {

		 			ob.update();

		 		});

		 	}

		 	return Subject;

		},

		observer : function() {

			var Observer = {},
		 	_subject;

		 	Observer.init = function( a ) {

		 		_subject = a;
		 		subject.add( this );

		 		return Observer;

		 	}

		 	Observer.update = function() {

		 		console.log( "updated" );
		 	}

		 	return Observer.init();

		}

	},

	factory : function( a, b, c ) {

		var selector = a.split( '/' );		

		var i = 0;
		
		var temp = DPRK[ selector[ 0 ] ];
		var parent = DPRK[ selector[ 0 ] ];
		
		while( ++i < selector.length ) {
			
			if( temp[ selector[ i ] ] === undefined )
				temp[ selector[ i ] ] = {};
			else 
				temp = temp[ selector[ i ] ];

			if( i - 1 > 0 ) {

				parent = parent[ selector[ i - 1 ] ];

			}
			

		}

		for( var i = 1, max = selector.length; i < max; i++ ) {


			if( i === max - 1 ) {

				if( temp[ selector[ selector.length - 1 ] ] === undefined ) {

					temp[ selector[ selector.length - 1 ] ] = {};
				}
				temp[ selector[ selector.length - 1 ] ].base = function() {

					var self = new parent.base(),
					sgetters = b( this );

					for( var key in sgetters ) {

						if( sgetters[ key ].get === undefined ) {

							sgetters[ key ].get = function() {					

								return this[ key ];

							}
						}

						if( sgetters[ key ].set === undefined ) {

							sgetters[ key ].set = function( _param ) {					

								return this[ key ] = _param;

							}
						}

 					}
 					// console.log( sgetters );
					Object.defineProperties( self, sgetters );

					for( var key in c) {

						self[ key ] = c[ key ];

					}					

					return self;
										
				}

			} else {

				temp = {};

			}			
			
		}

		return {

			new	: function( param ) { 

				var obj = new temp[ selector[ selector.length - 1 ] ][ 'base' ]();

				if( param !== undefined ) {

					for( var key in param ) {

						obj[ key ] = param[ key ];

					}


				}

				return obj; 

			}

		}

	}

}

/*Controller 
- User Input - HTTPS GET/POST, Click
- Call necessary resources needed to perform the user action

Model - Logic
- data and the rules applying to that data 
- Model givs controller a data representation of whatever the user requested. 

View
- provided different ways to present the date recieived from the model. 


Example

Online Book Store 

User can perform such actions: 
view books,
register,
buy,
add items,
create/delete books ( if admin )

When user click 'Fantasy Category'


Several Controller exists ( view, edit, create, etc. )

Several Model exists( book )

Several Views ( list of books, a page to edit books )

-> Controller

 1. Controller receives the user request and examines the request
 2. Asks to Model
 3. Model gets data from database
 4. aplly filter or logic if necessary and return to controller 
 5. Controller asks or selects View 
 6. return to User

 ADVANTAGE - Clear seperation of presentation and application logic
 */
var APP = {

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

		//console.log( this );
		//console.log( a.split( '/' ) );

		var input = a.split( '/' ),
		parent    = APP[ input[ 0 ] ];


		for( var i = 1, max = input.length; i < max; i++ ) {

			APP[ input[ i ] ] = {};

		}

		
		parent = function() {

			var self = {};

			Object.defineProperties( self, b );

			for( var key in c ) {

				self[ key ] = c[ key ];

			}

			return self;

		}

		return {

			self : function() {

				return parent;

			},

			action : function() {


			},

			new : function() {

				console.log( APP )

				return new parent();

			} 
			
		};

	}

}

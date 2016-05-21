// SIMON KINSLOW @kinslowdian 2016 //

var trace = function(msg){ console.log(msg); };

var nav;
var displayList;


function portfolio_init(event)
{
	trace("portfolio_init();");

	displayList = {};

	displayList.body 					= document.querySelector("body");
	displayList.wrapper 			= document.querySelector(".page-wrapper");
	displayList.hamburger 		= document.querySelector(".nav-hamburger");
	displayList.close 				= document.querySelector(".nav-close");
	displayList.mobileNav 		= document.querySelector(".mobile-nav");
	displayList.mobileNavMain	= document.querySelector(".mobile-nav-main");

	navigation_add();
}

function navigation_add()
{
	nav = {};
	nav.open = false;

	displayList.hamburger.addEventListener("click", navigation_event, false);
	displayList.close.addEventListener("click", navigation_event, false);
}

function navigation_event(event)
{
	var exitFrame;

	event.preventDefault();

	if(nav.open)
	{
		// CLOSE
		nav.open = false;

		displayList.wrapper.addEventListener("webkitTransitionEnd", navigation_transition_event, false);
		displayList.wrapper.addEventListener("transitionend", navigation_transition_event, false);

		displayList.wrapper.classList.remove("nav-fx-page-wrapper");
		displayList.mobileNavMain.classList.remove("nav-fx-mobile-nav-main");
	}

	else
	{
			// OPEN
			nav.open = true;

			displayList.mobileNav.classList.remove("mobile-nav-default");
			displayList.wrapper.classList.add("nav-fx-page-wrapper");
			// displayList.mobileNavMain.classList.add("nav-fx-mobile-nav-main");
			exitFrame = setTimeout(navigation_showOptions, 20);
	}
}

function navigation_showOptions()
{
	displayList.mobileNavMain.classList.add("nav-fx-mobile-nav-main");
}

function navigation_transition_event(event)
{
	displayList.wrapper.removeEventListener("webkitTransitionEnd", navigation_transition_event, false);
	displayList.wrapper.removeEventListener("transitionend", navigation_transition_event, false);

	displayList.mobileNav.classList.add("mobile-nav-default");
}
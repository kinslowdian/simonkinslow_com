// SIMON KINSLOW @kinslowdian 2016 //

var previewMain;

function preview_init()
{
	displayList.preview 			= document.querySelector("#preview");
	displayList.previewImg 			= document.querySelector("#preview img");
	displayList.previewPreloader 	= document.querySelector("#preview .preview-preloader-dot");
	
	displayList.previewOptions			= document.querySelector("#preview .preview-options");
	displayList.previewOptionsDisplay	= document.querySelector("#preview .preview-options .preview-options-display");
	displayList.previewClose			= document.querySelector("#preview .poa-close");
	displayList.previewCancel			= document.querySelector("#preview .poa-cancel");

	trace("preview_init();");
}

function preview_request(event)
{
	event.preventDefault();

	previewMain = {};
	previewMain.url_asset = event.target.getAttribute("data-img");
	previewMain.scrollSet	= event.pageY;

	displayList.wrapper.addEventListener("webkitTransitionEnd", preview_safety, false);
	displayList.wrapper.addEventListener("transitionend", preview_safety, false);

	displayList.wrapper.classList.add("preview-lock");
	displayList.wrapper.scrollTop += previewMain.scrollSet;

	displayList.previewPreloader.classList.add("preview-preload-tween");

	displayList.previewImg.style.opacity = 0;
	displayList.previewImg.setAttribute("src", previewMain.url_asset);

	window.scrollTo(0, 0);

	displayList.preview.classList.remove("preview-default");
	
	displayList.preview.addEventListener("click", preview_close, false);
	displayList.preview.style.cursor = "pointer";
}

function preview_safety(event)
{
	displayList.wrapper.removeEventListener("webkitTransitionEnd", preview_safety, false);
	displayList.wrapper.removeEventListener("transitionend", preview_safety, false);

	displayList.wrapper.classList.add("preview-safety");
}

function preview_preloader_end(event)
{
	displayList.previewPreloader.classList.remove("preview-preload-tween");
	displayList.previewImg.style.opacity = 1;
}

function preview_close(event)
{
	event.preventDefault();
	
	displayList.preview.removeEventListener("click", preview_close, false);
	displayList.preview.style.cursor = "default";
	
	
	displayList.previewOptionsDisplay.style.display = "block";
	displayList.previewOptions.style.opacity = "1";
	
	displayList.previewClose.addEventListener("click", preview_close_options, false);
	displayList.previewCancel.addEventListener("click", preview_close_options, false);	
}

function preview_close_options(event)
{
	var action;
	var actionTimer;
	
	event.preventDefault();
	
	displayList.previewClose.removeEventListener("click", preview_close_options, false);
	displayList.previewCancel.removeEventListener("click", preview_close_options, false);
	
	displayList.previewOptions.style.opacity = "0";
	
	action = event.target.getAttribute("data-action");
	
	actionTimer = setTimeout(preview_close_choice, 300, action);
}

function preview_close_choice(_action)
{
	var exitFrame;
	
	displayList.previewOptionsDisplay.style.display = "none";
	
	if(_action === "close")
	{
		displayList.wrapper.classList.remove("preview-safety");
		exitFrame = setTimeout(preview_close_apply, 20);
	}
	
	else if(_action === "cancel")
	{
		displayList.preview.addEventListener("click", preview_close, false);
		displayList.preview.style.cursor = "pointer";		
	}
}

function preview_close_apply()
{
	displayList.wrapper.addEventListener("webkitTransitionEnd", preview_end, false);
	displayList.wrapper.addEventListener("transitionend", preview_end, false);

	displayList.wrapper.classList.remove("preview-lock");

	var t = setTimeout(scrollReset, 20);

	delete previewMain;
}

function scrollReset()
{
	window.scrollTo(0, (previewMain.scrollSet - 100));
}

function preview_end(event)
{
	displayList.wrapper.removeEventListener("webkitTransitionEnd", preview_end, false);
	displayList.wrapper.removeEventListener("transitionend", preview_end, false);

	displayList.preview.classList.add("preview-default");
	displayList.previewImg.setAttribute("src", "");
}
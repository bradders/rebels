$(document).ready(function() {
	UI.init();
});

var UI = {

	init: function() {

        /**
        * Collate browser details
        */
        $(window).on("resize", function() {
            
            UI.site.width = document.documentElement.clientWidth;
            UI.getSiteMode();

            if(UI.site.mode == "small") {
                $(".header__nav").height(UI.site.height);
            }

        });
        UI.getSiteMode();
        $(".header__nav").height(UI.site.height);

        /**
        * Click functionality to deal with small screen nav
        */
		$(".js-toggle-menu").bind("click", function(e) {
            var menu = $(".js-header__nav");

            if(menu.attr("data-showing")) {
                /* Hide Menu */
                UI.hideMenu(menu);
            } else {
                /* Show Menu */
                UI.showMenu(menu);
            }

			return false;
		});

        $(".js-close-menu").bind("click", function(e){
            var menu = $(".js-header__nav");
            UI.hideMenu(menu);
            return false;
        });

        /**
        * Tile mouseover functionality
        */
        $(".js-tile__title").bind("mouseover", function(e) {
            var title = $(this);
            //title.animate({ height: "100%" });
            return false;
        });

        $(".js-tile__title").bind("mouseout", function(e) {
            var title = $(this);
            //title.animate({ height: "auto", minHeight: "auto" });
            return false;
        });


        /**
        * Click handler for main nav
        */
        $(".header__link").bind("mouseover", function() {
            var link = $(this), 
                name = link.attr("data-name"), 
                div = $(".dropdown[data-name='" + name + "']");

            $(".header__link").removeClass("active");
            link.addClass("active");

            $(".dropdown").hide();
            div.slideToggle();
            return false;
        });

        $(".header__link").bind("mouseout", function() {
            var link = $(this);
            link.removeClass("active");
            $(".dropdown").slideUp();
        });
		

	}, 

    showMenu: function(menu){
        var container = $(".container"), 
            menu_width = (container.width() / 100) * 40;
        
        menu.attr("data-showing", true).show();
        container.animate({ marginLeft: "-90%"});

    }, 

    hideMenu: function(menu){
        var container = $(".container"), 
            menu_width = (container.width() / 100) * 40;

        menu.removeAttr("data-showing");
        container.animate({ width: "100%", marginLeft: "0"});

    }, 

    slideshow: {
    
        init: function() {
        
            var slideshows = $(".slideshow");
            for(var i=0, length=slideshows.length;i<length;i++) {
            	
                var slideshow = $(slideshows[i]), 
                    panels_container = slideshow.find(".slideshow__panels"), 
                    content = slideshow.find(".slideshow__panel"),
                    window_width = slideshow.width(), 
                    slideshow_width = window_width * content.length;

                slideshow.height(content.height());
                slideshow.find(".slideshow__panel").width(window_width);
            
                panels_container.addClass("js-slideshow__panels");
                panels_container.width(slideshow_width);
                
                $(content[0]).attr("data-current", "true");
                this.addControls(slideshow);
            
            }
            
            $(window).on("resize", function() {
                UI.slideshow.resize();
            });
            
        }, 
        
        resize: function() {
            var slideshows = $(".slideshow");
            for(var i=0, length=slideshows.length;i<length;i++) {
            
                var slideshow = $(slideshows[i]), 
                    panels_container = slideshow.find(".slideshow__panels"), 
                    content = slideshow.find(".slideshow__panel"),
                    window_width = slideshow.width(), 
                    slideshow_width = window_width * content.length;
                
                slideshow.find(".slideshow__panel").width(window_width);
                slideshow.height(content.height());
                panels_container.width(slideshow_width).css({ left: 0 });
                content.removeAttr("data-current");
                $(content[0]).attr("data-current", "true");
            
            }
        }, 
        
        addControls: function(slideshow) {
            
            var html = "<div class='slideshow__controls'>";
                html += "<a href='./' class='slideshow__control slideshow__control--previous'><span>Previous</span></a>";
                html+= "<a href='./' class='slideshow__control slideshow__control--next'><span>Next</span></a>";
                html += "</div>";
            
            slideshow.append(html);
            this.updateUI(slideshow);
            
        }, 
        
        updateUI: function(slideshow) {
            
            var current_panel = UI.slideshow.currentPanel(slideshow), 
                next_panel = UI.slideshow.nextPanel(slideshow), 
                previous_panel = UI.slideshow.previousPanel(slideshow);
                
            slideshow.find(".slideshow__control").show().removeClass("slideshow__control--disabled");
            if(previous_panel.length == 0) {
                slideshow.find(".slideshow__control--previous").addClass("slideshow__control--disabled");
            }
            
            if(next_panel.length == 0) {
                slideshow.find(".slideshow__control--next").addClass("slideshow__control--disabled");
            }
            
            slideshow.find(".slideshow__control--previous").bind("click", function(e) {
                UI.slideshow.freezeUI(this);
                UI.slideshow.move(slideshow, this, "previous");
                return false;
            });
            
            slideshow.find(".slideshow__control--next").bind("click", function(e) {
                UI.slideshow.freezeUI(this);
                UI.slideshow.move(slideshow, this, "next");
                return false;
            });
            
        }, 
        
        move: function(slideshow, link, action) {
            
            if(!$(link).hasClass("slideshow__control--disabled")) {
                
                var window_width = slideshow.width(), 
                    current_position = parseInt(slideshow.find(".slideshow__panels").css("left")), 
                    new_position = 0, 
                    current_panel = UI.slideshow.currentPanel(slideshow), 
                    next_panel = UI.slideshow.nextPanel(slideshow), 
                    previous_panel = UI.slideshow.previousPanel(slideshow);

                if(action == "next") {
                    new_position = current_position - window_width;
                    next_panel.attr("data-current", "true");
                } else if(action == "previous") {
                    new_position = current_position + window_width;
                    previous_panel.attr("data-current", "true");
                }
                current_panel.removeAttr("data-current");
                
                slideshow.find(".slideshow__panels").animate({
                  left: new_position, 
                  complete: function() {
                      UI.slideshow.updateUI(slideshow);
                  }
                });
                
            }
            
        },

        currentPanel: function(slideshow) {
            return slideshow.find(".slideshow__panel[data-current='true']");
        }, 
        
        nextPanel: function(slideshow) {
            return UI.slideshow.currentPanel(slideshow).next();
        }, 
        
        previousPanel: function(slideshow) {
            return UI.slideshow.currentPanel(slideshow).previous();
        }, 
        
        freezeUI: function(l) {
            var link = $(l);
            link.off("click");
            link.on("click", function(e) {
                return false;
            });
        }
        
    },

	"site": {
		"width": document.documentElement.clientWidth, 
        "height": $(".container").height(), 
		"breakpoints": [
			{ "name": "medium", "min": 615 }, 
			{ "name": "small", "min": 0 }
		], 
		"mode": {}
	}, 

    getSiteMode: function() {
        for(var i=0, len=UI.site.breakpoints.length; i<len; i++) {
            var breakpoint = UI.site.breakpoints[i];
            if(document.documentElement.clientWidth > breakpoint.min) {
                UI.site.mode = breakpoint.name;
                break;
            }
        }
    }

};
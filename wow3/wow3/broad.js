		function broadFuntion (objConf) {
			this.initial(objConf);
		}
		broadFuntion.prototype =  {
			initial:function  (option) {	
				this.objConf = {
					slideWraper:'',
					intervalTime:2000,
					bottomSlideWraper:''

				};
				$.extend(this.objConf,option);
				this.index = 1;
				var _selector = this.objConf.slideWraper;
				this.$slideWraper = $(_selector);
				this.$bottomSlideWraperLi = $(self.objConf.bottomSlideWraper).children('li');
				this.timer = null;
				this.liSize = this.$slideWraper.children('li').size()-1;
				this.animating = false;
		     	this.play();
		     	this.bottomLiHover();
			},
			play:function  () {
				var self = this;
				self.timer = setInterval(function  () {
					self.next();
				},self.objConf.intervalTime);
			},
			next:function  () {
				var self = this;
				var animating = self.animating;
				var len = this.liSize;
				var $slideWraper = self.$slideWraper;
				var _interval = this.objConf.intervalTime;
				var _slideWidth = this.objConf.slideWidth||592;
				var _index = this.index;
				if(animating){
					return false;
				}
				self.animating = true;
				if(_index==len){
					self.bottomActive(0);
					$slideWraper.stop().animate({
						left:-len*_slideWidth
					},_interval,function  () {
						$slideWraper.stop().css({
							left:0
						});
						self.index = 1;
						self.animating = false;
					});
					return false;
				}
				self.bottomActive(_index);
				$slideWraper.stop().animate({
					left:-_index*_slideWidth
				},_interval,function  () {
					self.index++;
					self.animating = false;	
				});
			},
			bottomActive:function  (index) {
				var self = this;
				var $bottomSlideWraperLi = self.$bottomSlideWraperLi;
				$bottomSlideWraperLi.eq(index).addClass('dot_item_active')
										      .siblings()
										      .removeClass('dot_item_active');
			},
			bottomLiHover:function  () {
				var self = this;
				var $bottomSlideWraperLi = self.$bottomSlideWraperLi;
				var $slideWraper = self.$slideWraper;
				var _slideWidth = this.objConf.slideWidth||592;
				$bottomSlideWraperLi.click(function  () {
						self.index = $(this).index();
						self.stop();
						$slideWraper.stop().css({
							left:-self.index*_slideWidth
						});
						self.bottomActive(self.index);
						self.play();
				});
			},
			stop:function  () {
				var self = this;
				clearInterval(self.timer);
				self.animating = false;
			}
		};
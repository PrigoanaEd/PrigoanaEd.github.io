class vec {
    constructor(x,y) {
        this.x=x||0;
        this.y=y||0;
        this.add=v=>{
            this.x+=v.x;
            this.y+=v.y;
            return this;
        }
        this.sub=v=>{
            this.x-=v.x;
            this.y-=v.y;
            return this;
        }
        this.div=n=>{
            this.x/=n;
            this.y/=n;
            return this;
        }
        this.mult=n=>{
            this.x*=n;
            this.y*=n;
            return this;
        }
        this.setVals=n=>{
            switch(n) {
                case 0 : this.y=0;this.x=1;break;
                case 1 : this.y=0;this.x=-1;break;
                case 2 : this.y=-1;this.x=0;break;
                case 3 : this.y=1;this.x=0;break;
            }
            return this;
        }
        this.getOrientation=()=>{
            let x = Math.sign(this.x),
                y = Math.sign(this.y);

            if(x == 1) return 0;
            else if(x == -1) return 1;
            else if(y == -1) return 2;
            else if(y == 1) return 3;
        }
        this.equals=v=>{
            return this.x==v.x&&this.y==v.y
        }
        this.distance=v=>{
            let a = this.x - v.x, 
                b = this.y - v.y;
            return a * a + b * b;
        }
    }
}
vec.from=v=>{return new vec(v.x,v.y)};
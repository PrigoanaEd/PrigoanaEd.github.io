class SoundManagerError extends Error {
    constructor(message) {
      super(message); 
      this.name = "SoundManagerError"; 
    }
}
  
class SoundManager
{
    audioCount = 50;
    audioHolder = [];
    lastPlayed = [];
    protectedAudio = [];
    get protectedAudioCount()
    {
        return this.protectedAudio.length;
    }
    get lastPlayedCount()
    {
        return this.lastPlayed.length;
    }
    get maxAudioUsed()
    {
        return this.protectedAudioCount + this.lastPlayedCount;
    }
    get audioPlayingCount()
    {
        return this.audioHolder.filter(audio => !audio.paused).length;
    }
    constructor(audioCount = 50)
    {
        this.audioCount = audioCount;
        for(var i = 0;i < audioCount;i++)
        {
            this.audioHolder.push(new AudioContainer(this,new Audio()));
        }
    }
    GetUnusedSource(protect = false)
    {
        var toReturn = this.audioHolder.find(audio => !audio.playing && !this.protectedAudio.includes(audio));
        if(toReturn){
            if(this.lastPlayed.indexOf(toReturn) != -1)
                this.lastPlayed.splice(this.lastPlayed.indexOf(toReturn),1);
        }
        else
        {
            if(this.lastPlayedCount == 0)
                throw new SoundManagerError('Unable to find an Audio which is not protected.')
            toReturn = this.lastPlayed.shift();
        }
        if(protect)
            this.protectedAudio.push(toReturn);
        else
            this.lastPlayed.push(toReturn);
        if(toReturn.playing || toReturn.paused)
            toReturn.stop();
        return toReturn;
    }
    removeProtectedAudio(audio)
    {
        if(!this.protectedAudio.includes(audio))
            return false;
        this.protectedAudio.splice(this.protectedAudio.indexOf(audio),1);
        if(audio.playing || audio.paused)
            audio.stop();
        return true;
    }
    isProtected(audio)
    {
        if(!this.audioHolder.includes(audio))
            throw new SoundManagerError('Audio not in SoundManager list')
        return this.protectedAudio.includes(audio);
    }
}
class AudioContainer
{
    constructor(sManager,audio)
    {
        this.sManager = sManager;
        this.audio = audio;
        this.playing = false;
        this.paused = false;
        this.loopCallback = null;
    }
    get volume()
    {
        return this.audio.volume;
    }
    set volume(vol)
    {
        this.audio.volume = vol;
    }
    get src()
    {
        return this.audio.src;
    }
    set src(url)
    {
        this.audio.src = url;
    }
    get isProtected()
    {
        return this.sManager.isProtected(this.audio);
    }
    get duration()
    {
        return this.audio.duration;
    }
    get elapsedTime()
    {
        return this.audio.currentTime;
    }
    set elapsedTime(time)
    {
        this.audio.currentTime = time;
    }
    get elapsed()
    { 
        return this.elapsedTime /  this.duration;
    }
    set elapsed(time)
    {
        this.elapsedTime = time * this.duration;
    }
    get remainingTime()
    {
        return this.duration - this.elapsedTime;
    }
    get remaining()
    {
        return 1 - this.elapsed;
    }
    play(src = null,callback = ()=>{},unPause = false)
    {
        if(this.playing)
            throw new SoundManagerError('Already Playing!');
        if(this.paused && !unPause)
            throw new SoundManagerError('Audio Paused! Use resume() To Continue Playback');
        if(src)
            this.src = src;
        var onEnded = (e) =>{
            this.playing = false;
            if(!e.endedByStopFunction)
                callback();
            this.audio.removeEventListener('ended',onEnded);
        }
        this.audio.play();
        if(!unPause)
            this.audio.addEventListener('ended',onEnded);
        this.playing = true;
        this.paused = false;
        return this;
    }
    loop(src = null,callback = ()=>{},unPause = false)
    {
        if(this.playing)
            throw new SoundManagerError('Already Playing!');
        if(this.paused && !unPause)
            throw new SoundManagerError('Audio Paused! Use resume() To Continue Playback');
        if(src)
            this.src = src;
        var onPlay = () =>
        {
            var hasPaused = false;
            var onPaused = () => {
                hasPaused = true;
                this.audio.removeEventListener('paused',onPaused);
                this.audio.removeEventListener('play',onPlay);
            }
            this.audio.addEventListener('paused',onPaused);
            setTimeout(() => {
                if(hasPaused)
                    return;
                callback();
                var toLoop = setInterval(() => {
                    if(hasPaused)
                        return clearInterval(toLoop);
                    callback();
                },this.duration*1000);
            },this.remainingTime*1000);
        }
        
        var onEnded = () =>{
            this.playing = false;
            this.loopCallback = null;
            this.audio.removeEventListener('ended',onEnded);
        }
        if(!unPause)
            this.audio.addEventListener('ended',onEnded);
        this.audio.addEventListener('play',onPlay);
        this.audio.loop = true;
        this.loopCallback = callback;
        this.audio.play();
        this.playing = true;
        this.paused = false;
        return this;
    }
    pause()
    {
        if(this.paused || !this.playing)
            throw new SoundManagerError('Nothing To Pause!');
        this.audio.pause();
        this.paused = true;
        this.playing = false;
        this.audio.dispatchEvent(new Event('paused'));
        return this;
    }
    resume()
    {
        if(!this.paused)
            throw new SoundManagerError('Audio Not Paused!');   
        if(!this.loopCallback)
            return this.play(null,()=>{},true);
        return this.loop(null,this.loopCallback,true);
    }
    stop()
    {
        if(!this.playing && !this.paused)
            throw new SoundManagerError('Nothing Playing!');

        this.audio.pause();
        this.audio.loop = false;
        this.elapsed = 0;

        if(!this.paused)
            this.audio.dispatchEvent(new Event('paused'));
        var ended = new Event('ended');
        ended.endedByStopFunction = true;
        this.audio.dispatchEvent(ended);
        this.paused = false;
        return this;
    }
}
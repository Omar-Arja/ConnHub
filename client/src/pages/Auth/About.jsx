import React from 'react';
import Navbar from '../../components/navbar';

const About = () => {
    return (
        <div>
            <Navbar></Navbar>
            <section class="intro intro--white intro--centerText">
                <div class="intro__body">
                    <div class="intro__container">  
                        <div class="columns columns--center">
                            <div class="column">
                                <h1 class="title title--spaces desktop-xxl mobile-l">ConnHub</h1>
                                <h2 class="subtitle">No matter how complicated it is, We connect you</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="intro__foot">
                    <div class="intro__container">
                        <img class="bottom" src="hero-devices.svg" ></img>
                    </div>
                </div>
            </section>
            <section class="section section--medium section--primary section--centerText section--long">
                <div class="section__container">
                        <div class="columns columns--center">
                            <div class="column">
                                <h1 class="title title--spaces desktop-l mobile-m">Hello I'm Hadi. ConnHub Developer</h1>
                                <h2 class="subtitle desktop-s subtitle--normalText">Since the beginning of my journey as a computer sciences student and lover, I have always been wanting to solve some of the major problems that we are facing
                                    in our lives. One of then is finding someone who is good at his/her profession especially in Lebanon.<br></br>So I have came with the idea of <strong>Connhub</strong>. Which is a startup website that have a lot of potential in the near future.<br></br><p className='subtitle desktop-xs Alert'><strong> Note that what we have in our hands right now is just a of the full website.</strong></p></h2>
                        
                        </div></div>
                </div>
            </section>
                <section class="section section__skills section--centerText">
                <div class="section__container container--narrow">
                    <div class="section__box">
                        <div class="box__content">
                            <div class="columns columns--center">
                                <div class="column">
                                    <span></span>
                                    <h1 class="title size-medium title--spaces">Front End</h1>
                                    <p>Dynamic, Scalable, Responsive</p>
                                    <p class="titleForList text--primary subtitle--normalText">Languages I used:</p>
                                    <p>HTML, CSS, JavaScript</p>
                                    <p class="titleForList text--primary subtitle--normalText">Dev Tools:</p>
                                    <ul class="list">
                                        <li>VSCode</li>
                                        <li>Git</li>
                                        <li>Github</li>
                                        <li>Bootstrap</li>
                                        <li>ReactJs</li>
                                        <li>Vite</li>
                                    </ul>
                                </div>
                            <div class="column">
                                <span></span>
                                <h1 class="title size-medium title--spaces">Back End</h1>
                                <p>Dynamic, Scalable, Powerful</p>
                                <p class="titleForList text--primary subtitle--normalText">Languages I used:</p>
                                <p>PHP</p>
                                <p class="titleForList text--primary subtitle--normalText">Dev Tools:</p>
                                <ul class="list">
                                    <li>VSCode</li>
                                    <li>Git</li>
                                    <li>Github</li>
                                    <li>Apache2</li>
                                    <li>MySql</li>
                                </ul>
                            </div>
                        </div>
                    
                    </div>
                </div>
                </div>
            </section>
            
            <footer class="section section__footer section--primary section--centerText">
                <div class="section__container container--narrow">
                    <div class="columns columns--center">
                        <div class="column">
                            <h1 class="title subtitle--normalText">Connecting Everyone</h1>
                        </div>
                    </div>
                    <div class="social-icons">
                        <p class="section__container">
                            <a class="button button--medium" href="https://www.linkedin.com/in/hadi-al-hajj-b1860a267">
                                <span class="icon">
                                    <i class="fa fa-linkedin"></i>
                                </span>
                            </a>
                            <a class="button button--medium" href="mailto:hadialhajj213@gmail.com">
                                <span class="icon">
                                    <i class="fa fa-envelope"></i>
                                </span>
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About
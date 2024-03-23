import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function LoginAnimation(props: any) {
    const svgContainer = useRef<HTMLInputElement>(null)
    useGSAP(() => {
        // gsap code here...
        // --GANDALF ELEMENTS -- // 
        const gandalf = document.getElementById("Gandalf");

        // Gandalf Hair
        const gandalf_hair_one = document.getElementById("gandalf_x5F_hair_x5F_one");

        // Gandalf eyebrows;
        const gandalf_left_eyebrow = document.getElementById("gandalf_x5F_left_x5F_eyebrow");
        const gandalf_right_eyebrow = document.getElementById("gandalf_x5F_right_x5F_eyebrow");

        // Gandalf Eyes
        const gandalf_right_eyelid = document.getElementById("gandalf_x5F_right_x5F_eyelid");
        const gandalf_right_bottom_eyelid = document.getElementById("gandalf_x5F_right_x5F_bottom_x5F_eyelid");
        const gandalf_left_eyelid = document.getElementById("gandalf_x5F_left_x5F_eyelid");
        const gandalf_left_bottom_eyelid = document.getElementById("gandalf_x5F_left_x5F_bottom_x5F_eyelid");

        // Gandalf Hands & Controller
        const gandalf_hands = document.getElementById("gandalf_x5F_hands");

        const gandalf_left_joystick = document.getElementById("gandalf_x5F_left_x5F_joystick");
        const gandalf_left_thumb = document.getElementById("left_Thumb");

        const gandalf_right_joystick = document.getElementById("gandalf_x5F_right_x5F_joystick");
        const gandalf_right_thumb = document.getElementById("Right_Thumb");

        // -- GOLLUM ELEMENTS -- //

        const gollum = document.getElementById("Gollum");

        // Gollum Head and Hair 
        const gollum_head = document.getElementById("gollum_x5F_head");
        const gollum_hair_one = document.getElementById("gollum_x5F_left_x5F_hair_x5F_one");
        const gollum_hair_two = document.getElementById("gollum_x5F_left_x5F_hair_x5F_two");
        const gollum_hair_three = document.getElementById("gollum_x5F_left_x5F_hair_x5F_three");

        // Gollum Hands & Controller
        const gollum_hands = document.getElementById("gollum_x5F_controller_00000128478944557176670960000015930151561059717778_");

        // Gollum Eyes
        const gollum_left_eyelid = document.getElementById("gollum_x5F_left_x5F_upperlid");
        const gollum_left_eyelash = document.getElementById("gollum_x5F_left_x5F_eyelash");
        const gollum_left_bottom_eyelid = document.getElementById("gollum_x5F_left_x5F_lower_x5F_eyelid");

        const gollum_right_eyelid = document.getElementById("gollum_x5F_right_x5F_eyelid");
        const gollum_right_eyelash = document.getElementById("gollum_x5F_right_x5F_eyelash");
        const gollum_right_bottom_eyelid = document.getElementById("gollum_x5F_right_x5F_lower_x5F_eyelid_00000132071278217579723230000009005009462936974992_");

        // -- FRODO ELEMENTS -- //


        const frodo_head = document.getElementById("frodo_x5F_head");
        const frodo_hands = document.getElementById("frodo_x5F_hands");

        const frodo_right_eyelash = document.getElementById("frodo_x5F_right_x5F_eyelash");
        const frodo_left_eyelash = document.getElementById("frodo_x5F_left_x5F_eyelash");
        const frodo_left_bottom_eyelid = document.getElementById("frodo_x5F_left_x5F_bottom_x5F_eyelid");
        const frodo_right_bottom_eyelid = document.getElementById("frodo_x5F_bottom_x5F_right_x5F_eyelid");



        // GANDALF SPECIFIC ANIMATIONS //

        // makes gandalf blink his eyes whenever called
        function gandalfBlink() {
            gsap.to(gandalf_right_eyelid, { height: 11, duration: 0.1, delay: 1, repeat: 1, yoyo: true, transformOrigin: "top" });
            gsap.to(gandalf_right_bottom_eyelid, { attr: { d: "M596.4,363.4c-13.8,18.3-26.7,15.8-38.9,0" }, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });
            gsap.to(gandalf_left_eyelid, { height: 11, duration: 0.1, delay: 1, repeat: 1, yoyo: true, transformOrigin: "top" });
            gsap.to(gandalf_left_bottom_eyelid, { attr: { d: "M482.9,364.2c13.2,16.8,25.4,14.5,37.2,0" }, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });
        }


        function gandalfBlinkLoop() {
            const gandalfTimer = Math.floor((Math.random() * 5) + 1);
            gandalfBlink();
            gsap.delayedCall(gandalfTimer, gandalfBlinkLoop);
        };
        
        gsap.delayedCall(Math.floor((Math.random() * 5) + 1), gandalfBlinkLoop);

        (function gandalfEyebrowLoop() {
            const gandalfTimer = Math.floor((Math.random() * 30) + 3) * 1000;

            setTimeout(function () {
                raiseEyebrows();
                gandalfEyebrowLoop();
            }, gandalfTimer);
        }());


        // GOLLUM SPECIFIC ANIMATIONS //

        // makes gollum blink his eyes whenever called
        function gollumBlink() {
            gsap.to(gollum_left_eyelid, { attr: { d: "M251.9,423.3l-21.6-0.1c0.1-11.3,9.8-20.7,21.6-20.7c11.8,0,21.6,9.4,21.6,20.8H251.9z" }, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });
            gsap.to(gollum_left_eyelash, { y: 5, width: 43.4, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });
            gsap.to(gollum_left_bottom_eyelid, { attr: { d: "M272.5,428l-0.6,0.9l0,0c-5.2,8.2-11.6,13.6-18.7,14.1c-0.6,0-1.2,0-1.8,0c-7.9-0.2-15-5.6-20.5-15l0,0h20.5H272.5z" }, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });

            gsap.to(gollum_right_eyelid, { attr: { d: "M313.2,423.5l21.6-0.1c-0.1-11.4-9.8-20.8-21.6-20.8s-21.6,9.5-21.6,21H313.2z" }, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });
            gsap.to(gollum_right_eyelash, { y: 5, width: 43.4, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });
            gsap.to(gollum_right_bottom_eyelid, { attr: { d: "M291.8,428l0.6,0.9l0,0c5.3,8.2,11.8,13.6,19.1,14.1c0.6,0,1.2,0,1.8,0c8-0.2,15.3-5.6,20.9-15l0,0h-20.9H291.8z" }, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });

        }

        (function gollumBlinkLoop() {
            const gollumTimer = Math.floor((Math.random() * 5) + 1);
            gollumBlink();
            gsap.delayedCall(gollumTimer, gollumBlinkLoop);
        }());


        function animateGollumn() {
            gsap.to(gollum_head, { rotation: 5, duration: 3, delay: 0, repeat: -1, yoyo: true, transformOrigin: "center" });
            gsap.to(gollum_hair_one, { rotation: -7, duration: 3, delay: 0, repeat: -1, yoyo: true, transformOrigin: "top center" });
            gsap.to(gollum_hair_two, { rotation: -9, duration: 3, delay: 0, repeat: -1, yoyo: true, transformOrigin: "top center" });
            gsap.to(gollum_hair_three, { rotation: -2, duration: 2.9, delay: 0, repeat: -1, yoyo: true, transformOrigin: "top center" });
            gsap.to(gollum_head, { rotation: -5, duration: 3, delay: .9, repeat: -1, yoyo: true, transformOrigin: "center" });
        }

        // FRODO SPECIFIC ANIMATIONS

        function frodoBlink() {
            gsap.to(frodo_left_eyelash, { height: 6.6, duration: 0.1, delay: 1, repeat: 1, yoyo: true, transformOrigin: "top" });
            gsap.to(frodo_right_eyelash, { height: 6.6, duration: 0.1, delay: 1, repeat: 1, yoyo: true, transformOrigin: "top" });
            gsap.to(frodo_right_bottom_eyelid, { attr: { d: "M841,402.8c-9.8,11.9-20.1,13.8-31.1,0H841z" }, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });
            gsap.to(frodo_left_bottom_eyelid, { attr: { d: "M780.9,402.8c-10.7,13.8-20.8,11.9-30.4,0H780.9z" }, duration: 0.1, delay: 1, repeat: 1, yoyo: true, });
        }

        function frodoBlinkLoop() {
            const frodoTimer = Math.floor((Math.random() * 5) + 1);
            frodoBlink();
            gsap.delayedCall(frodoTimer, frodoBlinkLoop);
        };

        gsap.delayedCall(Math.floor((Math.random() * 5) + 1), frodoBlinkLoop);



        function animateFrodo() {
            // const headtimeline = gsap.timeline({ repeat: -1, yoyo: true });
            gsap.to(frodo_head, { rotation: 3, duration: 6, delay: 1, repeat: -1, yoyo: true, transformOrigin: "bottom center" });
            gsap.to(frodo_head, { rotation: -3, duration: 6, delay: 6, repeat: -1, yoyo: true, transformOrigin: "bottom center" });

            gsap.to("#Frodo", { rotate:-3, duration: 8, delay: 0, yoyo: true, repeat: -1, transformOrigin: "bottom center" })
            gsap.to("#Frodo", { rotate: 3, duration: 8, delay: 8, yoyo: true, repeat: -1, transformOrigin: "bottom center" })
        

        }

        animateFrodo();

        // Global animations

        // continously rotates hands & controller
        function rotateHands(handsElement: any, reversed = false) {
            let randomRotation = Math.floor((Math.random() * 5) + 5);
            randomRotation = reversed ? randomRotation * -1 : randomRotation;
            const duration = Math.floor((Math.random() * 5) + 5);

            let handTimeLine = gsap.timeline({ repeat: -1, yoyo: true });
            handTimeLine
                .to(handsElement, { rotate: randomRotation, duration: .9, delay: 0, transformOrigin: "center" })
                .to(handsElement, { rotate: randomRotation, duration: .9, delay: 0, transformOrigin: "center" })
                .to(handsElement, { rotate: (randomRotation * -1), duration: .9, delay: 0, transformOrigin: "center" });
        }

        function animateJoysticks() {
            const joyStickTimeLine = gsap.timeline({ repeat: -1, yoyo: true });

            // add some variation to the rotation off the joystick & thumb movement
            let randomRotate = Math.floor((Math.random() * 10) + 10);
            randomRotate = randomRotate % 2 == 0 ? randomRotate : randomRotate * -1;
            const thumbMovement = randomRotate % 2 == 0 ? 2 : -2;

            joyStickTimeLine
                .to(gandalf_left_joystick, { rotate: randomRotate, duration: 1, transformOrigin: "center" })
                .to(gandalf_left_thumb, { x: thumbMovement, duration: 1, transformOrigin: "center", yoyo: false }, "-=1.2")
                .to(gandalf_right_joystick, { rotate: randomRotate * -1, duration: 1, transformOrigin: "center" })
                .to(gandalf_right_thumb, { x: thumbMovement * -1, duration: 1, transformOrigin: "center", yoyo: false }, "-=1.1")
                .to(gandalf_right_joystick, { rotate: randomRotate, duration: 1, transformOrigin: "center" })
                .to(gandalf_right_thumb, { x: thumbMovement, duration: 1, transformOrigin: "center", yoyo: false }, "-=1.1")
                .to(gandalf_right_joystick, { rotate: 0, duration: 1, transformOrigin: "center" })
                .to(gandalf_left_joystick, { rotate: (randomRotate * -1), duration: 1, transformOrigin: "center" }, "-=1.2")
                .to(gandalf_left_thumb, { x: thumbMovement * -1, duration: 1, transformOrigin: "center", yoyo: false }, "-=1.2")
                .to(gandalf_left_joystick, { rotate: 0, duration: 1, transformOrigin: "center" });
        }

        // contionusly moves eyebrows up and down, this can probably just be css
        function animateEyebrows() {
            gsap.to(gandalf_left_eyebrow, { y: -2.5, duration: 1.3, delay: 0, repeat: -1, yoyo: true });
            gsap.to(gandalf_right_eyebrow, { y: -2.5, duration: 1.3, delay: 0, repeat: -1, yoyo: true });
        }

        function raiseEyebrows() {
            gsap.to(gandalf_left_eyebrow, { rotate: -10, duration: 1.3, yoyo: true, transformOrigin: "left" });
            gsap.to(gandalf_right_eyebrow, { rotate: 10, duration: 1.3, yoyo: true, transformOrigin: "right" });

            gsap.to(gandalf_left_eyebrow, { rotate: 0, duration: 1.3, delay: 5, transformOrigin: "left" });
            gsap.to(gandalf_right_eyebrow, { rotate: 0, duration: 1.3, delay: 5, transformOrigin: "right" });
        }

        function rockCharacterBody(characterElement: any) {
            const rockingTimeLine = gsap.timeline({ repeat: -1, yoyo: true, ease: "power1.inOut" });
            rockingTimeLine
                .to(characterElement, { rotation: 2, duration: 3, yoyo: true, transformOrigin: "bottom center" })
                .to(characterElement, { rotation: -2, duration: 3, yoyo: true, transformOrigin: "bottom center" });
        }

        rockCharacterBody(gandalf);
        // rockCharacterBody('#Frodo');

        function runAnimation() {
            animateGollumn();
            animateJoysticks();
            animateEyebrows();
            rotateHands(gandalf_hands)
            rotateHands(gollum_hands, true);
            rotateHands(frodo_hands, true);

        }

        // setTimeout(function () {
        //     raiseEyebrows();
        // }, 1500);
        
        gsap.delayedCall(1.5, raiseEyebrows);


        runAnimation();

    }, {scope: svgContainer});
    

    return (
        <div id="couch_animation" ref={svgContainer}>
            <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 1100 600"
     style={{
                    enableBackground: "new 0 0 1100 600",
                    position: "absolute",
                    width: "100%",
                    left: "0",
                   
                    
                }}
    xmlSpace="preserve"
    {...props}
  >
    <style type="text/css">
      {
        "\n\t #Layer_1 .st0{fill:#6B3D36;}\n\t #Layer_1 .st1{fill:#4C2C25;}\n\t #Layer_1 .st2{fill:none;}\n\t #Layer_1 .st3{fill:#4B6841;}\n\t #Layer_1 .st4{display:none;fill:none;stroke:#707070;stroke-width:2.3347;stroke-miterlimit:10;}\n\t #Layer_1 .st5{fill:#8E8E8E;}\n\t #Layer_1 .st6{fill:#353f52;}\n\t #Layer_1 .st7{fill:#3A4456;}\n\t #Layer_1 .st8{fill:#C9B250;}\n\t #Layer_1 .st9{fill:#161616;stroke:#C9B045;stroke-width:1.7703;stroke-miterlimit:10;}\n\t #Layer_1 .st10{fill:#161616;stroke:#C9B045;stroke-width:1.7658;stroke-miterlimit:10;}\n\t #Layer_1 .st11{fill:#191E26;}\n\t #Layer_1 .st12{fill:#13161C;}\n\t #Layer_1 .st13{fill:#3AA03C;}\n\t #Layer_1 .st14{fill:#A5A5A5;}\n\t #Layer_1 .st15{fill:#B2B2B2;}\n\t #Layer_1 .st16{fill:#CEC251;}\n\t #Layer_1 .st17{fill:#2E7C2E;}\n\t #Layer_1 .st18{fill:#474747;}\n\t #Layer_1 .st19{fill:none;stroke:#A5A5A5;stroke-miterlimit:10;}\n\t #Layer_1 .st20{fill:#969696;}\n\t #Layer_1 .st21{fill:#444444;}\n\t #Layer_1 .st22{fill:#848484;}\n\t #Layer_1 .st23{fill:#E7C0AC;}\n\t #Layer_1 .st24{fill:#D8B0A3;}\n\t #Layer_1 .st25{fill:#C4C4C4;}\n\t #Layer_1 .st26{fill:#DDDDDD;}\n\t #Layer_1 .st27{fill:#B7B7B7;}\n\t #Layer_1 .st28{fill:#50688C;}\n\t #Layer_1 .st29{fill:#FFFFFF;}\n\t #Layer_1 .st30{fill:#D1A397;}\n\t #Layer_1 .st31{fill:#3F3F3F;}\n\t #Layer_1 .st32{fill:#E5ADAC;}\n\t #Layer_1 .st33{fill:#BABABA;}\n\t #Layer_1 .st34{fill:#A5A5A5;stroke:#9B9B9B;stroke-width:0.2299;stroke-miterlimit:10;}\n\t #Layer_1 .st35{fill:#AFAFAF;}\n\t #Layer_1 .st36{fill:#686868;}\n\t #Layer_1 .st37{fill:#BCA9FF;}\n\t #Layer_1 .st38{fill:#4C4C4C;}\n\t #Layer_1 .st39{fill:#F9CBB2;}\n\t #Layer_1 .st40{fill:#F2DCCE;}\n\t #Layer_1 .st41{fill:#EFB9A0;}\n\t #Layer_1 .st42{display:none;fill:#E5ADAC;}\n\t #Layer_1 .st43{fill:#E5BBA8;}\n\t #Layer_1 .st44{fill:#E5C9C1;}\n\t #Layer_1 .st45{fill:none;stroke:#5B5B5B;stroke-width:0.789;stroke-miterlimit:10;}\n\t #Layer_1 .st46{fill:none;stroke:#5B5B5B;stroke-width:1.0655;stroke-miterlimit:10;}\n\t #Layer_1 .st47{fill:none;stroke:#5B5B5B;stroke-width:0.7836;stroke-miterlimit:10;}\n\t #Layer_1 .st48{fill:none;stroke:#666666;stroke-width:1.0655;stroke-miterlimit:10;}\n\t #Layer_1 .st49{fill:none;stroke:#5B5B5B;stroke-width:0.8424;stroke-miterlimit:10;}\n\t #Layer_1 .st50{fill:#FFC8B3;}\n\t #Layer_1 .st51{fill:#A36952;}\n\t #Layer_1 .st52{fill:none;stroke:#4C4C4C;stroke-width:0.9084;stroke-miterlimit:10;}\n\t #Layer_1 .st53{fill:#5B4332;}\n\t #Layer_1 .st54{fill:#408CDD;}\n\t #Layer_1 .st55{fill:#70533C;}\n\t #Layer_1 .st56{fill:none;stroke:#D8C727;stroke-width:0.7618;stroke-miterlimit:10;}\n\t #Layer_1 .st57{fill:none;stroke:#EFE026;stroke-width:0.8795;stroke-miterlimit:10;}\n\t #Layer_1 .st58{fill:#8AA097;}\n\t #Layer_1 .st59{fill:#73847D;}\n\t #Layer_1 .st60{fill:#73847D;stroke:#FFFFFF;stroke-width:1.2666;stroke-miterlimit:10;}\n\t #Layer_1 .st61{fill:none;stroke:#73847D;stroke-width:1.2666;stroke-miterlimit:10;}\n\t #Layer_1 .st62{fill:#FFCEB6;}\n\t #Layer_1 .st63{fill:#4F322B;}\n\t #Layer_1 .st64{fill:#3A2420;}\n\t #Layer_1 .st65{fill:#512921;}\n\t #Layer_1 .st66{fill:#6B3B07;}\n\t #Layer_1 .st67{fill:#7A420A;}\n\t #Layer_1 .st68{fill:#21110E;}\n\t #Layer_1 .st69{fill:#777777;}\n"
      }
    </style>
    <g id="Table">
      <rect x={1016.8} y={501.2} className="st0" width={83.2} height={14.9} />
      <rect x={1016.8} y={515.6} className="st1" width={20.2} height={289.4} />
      <rect x={1016.8} y={509.4} className="st1" width={83.2} height={29.9} />
    </g>
    <g id="Vase">
      <line className="st2" x1={47.5} y1={520} x2={54.8} y2={520} />
      <line className="st3" x1={49.4} y1={294.1} x2={42.1} y2={294.1} />
      <line className="st4" x1={51.2} y1={524.4} x2={51.2} y2={716.1} />
      <path className="st3" d="M45.8,297.5" />
      <path
        className="st3"
        d="M72,525.9c0,0,5.3-218,32.1-236.8C130.8,270.3,72,525.9,72,525.9z"
      />
      <path
        className="st3"
        d="M72.6,525.7c0,0-29.6-216.9-6.1-239.7C89.9,263.3,72.6,525.7,72.6,525.7z"
      />
      <path
        className="st3"
        d="M59.4,507.7c0,0-24.3-272.1,6.9-300.4C97.6,179,59.4,507.7,59.4,507.7z"
      />
      <path
        className="st3"
        d="M75.9,530.6c0,0-54.3-212.8-33.5-238.1C63.2,267.2,75.9,530.6,75.9,530.6z"
      />
      <path
        className="st3"
        d="M73.5,628.6c0,0-49.2-213.9-27.9-238.6C67,365.2,73.5,628.6,73.5,628.6z"
      />
      <path
        className="st5"
        d="M111.6,572c-8.2,16.1-26,136.6-26,136.6H47.2c0,0-17.8-120.4-26-136.6c-8.2-16.1,14.5-28.5,14.5-28.5v-13H25.4 v-12.2h82.2v12.2H97.1v13C97.1,543.5,119.8,555.8,111.6,572z"
      />
    </g>
    <g id="couch">
      <path
        className="st6"
        d="M963.2,640.3H114.1V369.9c0-27,24.7-49,55.1-49h739c30.4,0,55,21.9,55,48.9V640.3z"
      />
      <rect x={67.2} y={560.2} className="st6" width={942.9} height={78.1} />
      <rect x={151.9} y={551} className="st7" width={773.4} height={15.7} />
      <path
        className="st6"
        d="M150,640H68.2c-1,0-1.8-0.9-1.8-1.8V487.5c0-11.9,9.6-21.5,21.4-21.5h45.3c10.5,0,18.9,8.5,18.9,18.9V638 C152,639.1,151.1,640,150,640z"
      />
      <path
        className="st6"
        d="M924.5,638.1V484.9c0-10.4,8.4-18.9,18.9-18.9h45.3c11.8,0,21.4,9.6,21.4,21.5v150.6c0,0.9-0.8,1.8-1.8,1.8 h-81.8C925.3,640,924.4,639.1,924.5,638.1z"
      />
      <g id="Blanket">
        <polygon
          className="st8"
          points="176.4,470.6 173.5,489 175.6,489 181.5,489 177.5,469.3  "
        />
        <polygon
          className="st8"
          points="188,470.6 185.2,489 193.1,489 189.1,469.3  "
        />
        <polygon
          className="st8"
          points="907.3,470.6 910.2,489.1 908.1,489.1 902.3,489.1 906.2,469.3  "
        />
        <polygon
          className="st8"
          points="895.7,470.6 898.6,489.1 890.6,489.1 894.6,469.3  "
        />
        <line className="st2" x1={226.1} y1={469.7} x2={225} y2={471} />
        <path className="st8" d="M230,489.4" />
        <line className="st2" x1={317.3} y1={471.1} x2={316.2} y2={472.5} />
        <line className="st2" x1={333.9} y1={471.1} x2={332.8} y2={472.5} />
        <line className="st2" x1={349.4} y1={471.5} x2={348.3} y2={472.9} />
        <line className="st2" x1={365.9} y1={471.5} x2={364.8} y2={472.9} />
        <line className="st2" x1={381.8} y1={471} x2={380.7} y2={472.3} />
        <line className="st2" x1={397.3} y1={471.3} x2={396.2} y2={472.7} />
        <line className="st2" x1={413.8} y1={471.3} x2={412.7} y2={472.7} />
        <line className="st2" x1={429.8} y1={471.5} x2={428.7} y2={472.9} />
        <line className="st2" x1={446.4} y1={471.5} x2={445.3} y2={472.9} />
        <line className="st2" x1={643.1} y1={471} x2={642} y2={472.3} />
        <line className="st2" x1={658.6} y1={471.3} x2={657.5} y2={472.7} />
        <line className="st2" x1={675.1} y1={471.3} x2={674} y2={472.7} />
        <line className="st2" x1={691.1} y1={471.5} x2={690} y2={472.9} />
        <line className="st2" x1={707.7} y1={471.5} x2={706.6} y2={472.9} />
        <line className="st2" x1={725.6} y1={471.3} x2={724.5} y2={472.7} />
        <polygon
          className="st8"
          points="839.7,472.7 836.8,491.1 838.9,491.1 844.8,491.1 840.8,471.3  "
        />
        <line className="st2" x1={742.1} y1={471.3} x2={741} y2={472.7} />
        <line className="st2" x1={758.1} y1={471.5} x2={757} y2={472.9} />
        <line className="st2" x1={774.7} y1={471.5} x2={773.6} y2={472.9} />
        <path
          className="st9"
          d="M912,320v144.3c0,3.4-3.5,6.1-7.8,6.1h-723c-6.6,0-12-4.2-12-9.4V320"
        />
        <path
          className="st10"
          d="M907.5,321L907,460.3c0,2.6-2.7,4.7-6.1,4.7l-720.8-1.1c-3.4,0-6.1-2.1-6.1-4.8l0.5-139.3"
        />
      </g>
      <path
        className="st11"
        d="M141,640.3H77.3c-0.8,0-1.4-0.9-1.4-1.7V497c0-11.2,7.4-20.2,16.7-20.2h35.2c8.2,0,14.7,8,14.7,17.8v143.9 C142.5,639.5,141.8,640.3,141,640.3z"
      />
      <path
        className="st11"
        d="M934.4,638.5V494.6c0-9.8,6.5-17.8,14.7-17.8h35.2c9.2,0,16.7,9,16.7,20.2v141.6c0,0.9-0.6,1.7-1.4,1.7h-63.7 C935,640.3,934.3,639.5,934.4,638.5z"
      />
      <rect x={151.9} y={551} className="st11" width={2.8} height={46.1} />
      <rect x={921.1} y={551} className="st11" width={2.8} height={46.1} />
      <rect x={153.4} y={593} className="st12" width={770.5} height={4} />
    </g>
    <g id="can_x5F_four">
      <path
        className="st13"
        d="M181.4,546.5h-15c-2.6,0-4.8-2.2-4.8-4.8v-25.1c0-2.6,2.2-4.8,4.8-4.8h15c2.6,0,4.8,2.2,4.8,4.8v25.1 C186.3,544.3,184.1,546.5,181.4,546.5z"
      />
      <ellipse className="st14" cx={173.9} cy={512.6} rx={10.7} ry={1.5} />
      <ellipse className="st15" cx={173.9} cy={512.6} rx={9.5} ry={0.8} />
      <path
        className="st16"
        d="M167.6,529.5l-2.7,2c-1.5-2-1.5-4.4-0.1-5.6c1.4-1.1,3.9-0.5,5.5,1.5L167.6,529.5z"
      />
      <path
        className="st17"
        d="M168,529.8l2.7-2c1.5,2,1.5,4.4,0.1,5.6c-1.5,1.1-3.9,0.4-5.5-1.5L168,529.8z"
      />
      <ellipse className="st18" cx={173.2} cy={513} rx={2.6} ry={0.4} />
      <path
        className="st19"
        d="M184.3,512.2c0,0.7-4,1.2-10,1.2s-10.8-0.6-10.8-1.3s4.8-1.3,10.8-1.3S184.3,511.5,184.3,512.2z"
      />
    </g>
    <g id="Gandalf">
      <g id="Hat">
        <path
          className="st20"
          d="M695.8,326.2c0,14.2-70.4,25.7-157.2,25.7s-157.2-11.5-157.2-25.7c0-9.3,30.4-17.5,75.8-22l-2.3,7.7l170.3,1 l-2.5-8.4C666.7,309,695.8,317,695.8,326.2z"
        />
        <ellipse
          id="hat_x5F_shadow"
          className="st21"
          cx={537.2}
          cy={326.2}
          rx={148.2}
          ry={15.6}
        />
        <polygon
          id="hat_x5F_flap"
          className="st22"
          points="545.2,52.9 609.7,131.2 551.5,106.2  "
        />
      </g>
      <path
        id="gandalf_x5F_dome"
        className="st23"
        d="M598.5,438.1H481.3c-9,0-16.4-7.4-16.4-16.4V297.6h150.2v123.8 C615.2,430.7,607.7,438.1,598.5,438.1z"
      />
      <rect
        id="Dome_Shadow_00000176761890401203373860000010242651267571340726_"
        x={464.9}
        y={307.8}
        className="st24"
        width={150.2}
        height={12.2}
      />
      <path
        id="Beard_00000087397094329619217320000004330890663999975561_"
        className="st25"
        d="M633.4,486L633.4,486l-8.1-36.4l-10.2-45.7 l-0.9-4l-2.2,1.2l-1.1,0.6l-0.1,0.1l-2.3-14.1l0.2,0.2l0.5,0.6l3.4,3.9l-2.7-11.8c-0.2-1-1.3-1.7-2.5-1.7c-0.1,0-0.1,0-0.2,0 c-0.1,0-0.1,0-0.2,0c-0.9,0.1-1.7,0.6-2,1.3l-6.6,14.7c-0.5,1.1-1.9,1.7-3.3,1.2L540,379c-0.2-0.1-0.6-0.1-1-0.1h-0.6 c-0.4,0-0.6,0-0.8,0.1L481,395.9c-1.3,0.4-2.8-0.1-3.3-1.2l-5.8-12.8l-0.8-1.9c-0.3-0.6-0.9-1-1.6-1.2c-0.2-0.1-0.5-0.1-0.8-0.1 h-0.2c-0.8,0-1.5,0.3-2,0.7c-0.3,0.3-0.5,0.6-0.5,1.1l-1.1,6.1l-8.8,48.3l-2.8,15.5l-6.6,36.2l-0.2,1v11.1l-3.9,10.1V519l-4.5,16.6 l-0.2-0.5l-4,21.7l16.2-18.2c0,0-8.7,31.8,5.8,24.2s22.9,1.2,22.9,1.2l27.7-4.1l20,2.2c0,0,3.6,0.8,6.8,2.2 c3,1.2,33.3-15.2,33.3-15.2l18.8,13.9c0,0,22.8,5.1,24.5,5.1s32.3-14.7,32.3-14.7l6.5,1.7L633.4,486z M538,396.9 c14.3,0,26,9.3,26,20.7c0.1,11.5-11,0-25.4,0c-14.3,0-26.6,11.5-26.6,0S523.7,396.9,538,396.9z"
      />
      <g id="gandalf_x5F_left_x5F_eye">
        <path
          id="sclera_00000116940570885657042030000002292970050521889214_"
          className="st26"
          d="M520.7,358.4c-0.1,0.4-0.1,0.6-0.2,1 c-2.5,9.3-10,16-18.8,16s-16.3-6.8-18.8-16c-0.1-0.4-0.1-0.6-0.2-1h12.9c0,0.4-0.1,0.6-0.1,1c0,3.7,2.7,6.9,5.9,6.9 c3.3,0,5.9-3,5.9-6.9c0-0.4,0-0.6-0.1-1H520.7z"
        />
        <polygon
          id="eye_shadow_00000129906975780269493030000015027920274154327967_"
          className="st27"
          points="482.8,359.4 520.4,359.4  520.8,358.4 482.5,358.4  "
        />
        <path
          id="pupil_00000035493161476524226910000006584336054387903641_"
          className="st28"
          d="M507.3,359.4c0,3.7-2.7,6.9-5.9,6.9 c-3.3,0-5.9-3-5.9-6.9c0-0.4,0-0.6,0.1-1c0.4-3.4,2.9-5.9,5.9-5.9s5.4,2.5,5.9,5.9C507.3,358.8,507.3,359,507.3,359.4z"
        />
        <rect
          id="gandalf_x5F_left_x5F_eyebrow"
          x={477.8}
          y={341.4}
          className="st15"
          width={48.5}
          height={11.5}
        />
        <ellipse
          id="hightlight"
          className="st29"
          cx={503}
          cy={366.3}
          rx={2.8}
          ry={3.1}
        />
        <path
          id="gandalf_x5F_left_x5F_bottom_x5F_eyelid"
          className="st30"
          d="M489.5,370.7c8.6,7,16.5,6,24.1,0H489.5z"
        />
        <rect
          id="gandalf_x5F_left_x5F_eyelid"
          x={481}
          y={352.7}
          className="st31"
          width={39.8}
          height={6.3}
        />
        <polygon
          id="left_x5F_top_x5F_eyelid_x5F_corner"
          className="st31"
          points="483.3,360.9 483.3,358.4 481.9,358.4  "
        />
      </g>
      <g id="gandalf_x5F_right_x5F_eye">
        <path
          id="sclera_00000172404592715603268150000009592487810269408188_"
          className="st26"
          d="M557.8,358.9c0.1,0.4,0.1,0.6,0.2,1 c2.5,9.3,10,16,18.8,16s16.3-6.8,18.8-16c0.1-0.4,0.1-0.6,0.2-1h-12.9c0,0.4,0.1,0.6,0.1,1c0,3.7-2.7,6.9-5.9,6.9s-5.9-3-5.9-6.9 c0-0.4,0-0.6,0.1-1H557.8z"
        />
        <polygon
          id="eye_shadow_00000114754181490334644160000009075518673276321958_"
          className="st27"
          points="595.6,359.9 558,359.9  557.7,358.9 595.9,358.9  "
        />
        <path
          id="pupil_00000059295427990398441720000009943220146323846275_"
          className="st28"
          d="M571.2,359.9c0,3.7,2.7,6.9,5.9,6.9 c3.3,0,5.9-3,5.9-6.9c0-0.4,0-0.6-0.1-1c-0.4-3.4-2.9-5.9-5.9-5.9s-5.4,2.5-5.9,5.9C571.3,359.2,571.2,359.5,571.2,359.9z"
        />
        <rect
          id="gandalf_x5F_right_x5F_eyelid"
          x={557.8}
          y={352.7}
          className="st31"
          width={39.3}
          height={6.3}
        />
        <polyline
          id="gandalf_x5F_right_x5F_eyebrow"
          className="st15"
          points="600.1,341.4 600.1,352.9 551.6,352.9 551.6,341.4  "
        />
        <ellipse
          id="hightlight_00000037665784345526812240000000253973177831384502_"
          className="st29"
          cx={579.7}
          cy={366.8}
          rx={2.8}
          ry={3.1}
        />
        <path
          id="gandalf_x5F_right_x5F_bottom_x5F_eyelid"
          className="st30"
          d="M590,370.7c-9.3,7.4-18,6.4-26.3,0H590z"
        />
        <polygon
          id="right_x5F_top_x5F_eyelid_x5F_corner"
          className="st31"
          points="595.2,360.9 595.2,358.4 596.5,358.4  "
        />
      </g>
      <path
        id="gandalf_x5F_nose"
        className="st32"
        d="M542.6,367.4c0,0.8-0.2,1.6-0.6,2.2c-0.2-0.4-0.6-0.6-1.1-0.6c-0.8,0-1.4,0.6-1.4,1.4 c0,0.2,0.1,0.6,0.2,0.7c-0.4,0.1-0.6,0.1-1,0.1s-0.6,0-1-0.1c0.1-0.2,0.2-0.5,0.2-0.8c0-0.8-0.6-1.4-1.4-1.4 c-0.5,0-0.8,0.2-1.1,0.6c-0.5-0.6-0.7-1.4-0.7-2.3c0-2.2,1.8-4,4-4C540.8,363.4,542.6,365.2,542.6,367.4z"
      />
      <g id="Left_Hair_00000158030005128619493850000011478814835553710506_">
        <path
          className="st33"
          d="M462.7,301.3L443.2,331c-1.8,2.7-2.2,6.1-1,9.3l5.1,13.3c1.1,2.9,0.8,6.1-0.7,8.8l-18.1,31.2 c-1.6,2.8-1.8,6.3-0.5,9.2l3.9,9c1.2,2.8,1.1,5.9-0.2,8.6l-14.2,28.9c-1.4,2.9-1.3,6.3,0,9.2l9.9,19.7c0.8,1.8,2.3,3.1,3.9,3.9 l9.8,4.7c4.5,2.2,9.6-0.8,7.1-5.1l25.4-118.5c3.7-1.9-2.5-4.1-2.5-4.8l5.8-51.4c0-5.9-4.9-10.4-9.9-8.8l0,0 C465.3,298.4,463.8,299.6,462.7,301.3z"
        />
        <polygon
          className="st34"
          points="466.4,298 452.4,327.6 457.6,346.1 444.1,378.3 448.7,393.2 438.1,423.5 446,445.4 458.2,453.6  474.1,348.3 473.6,295.1  "
        />
        <polygon
          id="gandalf_x5F_hair_x5F_one"
          className="st34"
          points="473.3,302 465.4,327.4 467.9,343.5 460.2,371.3 462.6,384  456.3,410.2 460.2,429.3 466.6,436.5 476.7,345.5 477.4,299.5  "
        />
      </g>
      <g id="Right_Hair_00000023962276706431643130000002653135786367854239_">
        <path
          className="st35"
          d="M617.2,301.4l19.9,29.5c1.8,2.7,2.2,6.1,1.1,9.3l-4.9,13.4c-1.1,2.9-0.7,6.3,0.7,8.8l18.4,31.1 c1.6,2.7,1.8,6.1,0.6,9.2l-3.7,9c-1.1,2.8-1,5.9,0.4,8.6l14.5,28.7c1.4,2.8,1.4,6.3,0,9.2l-9.6,19.8c-0.8,1.8-2.2,3.1-3.9,4 l-9.8,4.8c-4.5,2.2-9.6-0.7-10.9-6.1l-26.8-118.4c-0.1-0.7-0.2-1.6-0.2-2.3l-0.1-52.7c0-5.9,4.8-10.4,9.9-8.9l0,0 C614.5,298.6,616,299.8,617.2,301.4z"
        />
        <polygon
          className="st34"
          points="609.4,298.3 623.6,327.7 618.7,346.3 632.4,378.3 628.1,393.2 639.1,423.4 631.3,445.4 619.3,453.7  602.2,348.6 602,295.4  "
        />
      </g>
      <path
        className="st34"
        d="M599.1,306.7c0,0-6.4,6.4-5,12.5s21.9,39.9,18.8,54.1s-6.2,16.9-5.1,27.2c1.1,10.2,1.7,11.8,1.7,11.8 l0.9-19.6c0,0,6.5-8.2,6.8-21.6S601,305.5,601,305.5"
      />
      <path
        id="gandalf_x5F_hat_x5F_point"
        className="st20"
        d="M625.2,312.9l-170.3-1l2.3-7.7l74.1-242.8c3.4-11.3,17-11.2,20.3,0.1 l71.1,243L625.2,312.9z"
      />
      <rect
        id="gandalf_x5F_mouth"
        x={522.6}
        y={406.5}
        className="st31"
        width={32.1}
        height={2.7}
      />
      <g id="gandalf_x5F_hands">
        <g id="gandalf_x5F_controller">
          <rect
            id="controller_x5F_base"
            x={499.9}
            y={473.7}
            className="st36"
            width={78.7}
            height={17.7}
          />
          <rect
            id="left_x5F_trigger"
            x={504.9}
            y={480.9}
            className="st37"
            width={17.6}
            height={3.3}
          />
          <rect
            id="right_x5F_trigger"
            x={556.3}
            y={480.9}
            className="st37"
            width={17.6}
            height={3.3}
          />
          <g id="gandalf_x5F_left_x5F_joystick">
            <ellipse
              id="joystick"
              className="st36"
              cx={508.1}
              cy={469.5}
              rx={5.5}
              ry={1.3}
            />
            <ellipse
              id="joystick_00000087372449942573025550000000187939782288725899_"
              className="st38"
              cx={508.1}
              cy={470.1}
              rx={5.5}
              ry={0.8}
            />
            <rect
              id="joystick_stem"
              x={506.9}
              y={469.7}
              className="st36"
              width={2.5}
              height={7.5}
            />
          </g>
          <g id="gandalf_x5F_right_x5F_joystick">
            <ellipse
              id="joystick_00000150085728776645694040000005372543675170030001_"
              className="st36"
              cx={570.4}
              cy={469.2}
              rx={5.5}
              ry={1.3}
            />
            <ellipse
              id="joystick_00000179626478861158220240000017730654490863016859_"
              className="st38"
              cx={570.4}
              cy={469.8}
              rx={5.5}
              ry={0.8}
            />
            <rect
              id="joystick_stem_00000097463200794984618150000017802048899541633205_"
              x={569.4}
              y={469.4}
              className="st36"
              width={2.4}
              height={7.5}
            />
          </g>
        </g>
        <g id="Left_hand">
          <ellipse
            id="Left_Hand_00000080914749333416900150000006771267989267772846_"
            className="st23"
            cx={477.1}
            cy={484.8}
            rx={22.8}
            ry={26.3}
          />
          <path
            id="left_Thumb"
            className="st23"
            d="M489.7,470.7c-2.3-2-3.3-5.2-2.5-8.4c1.3-5.4,7.1-9.4,13-8.8s9.6,5.5,8.3,11 s-7.1,9.4-13,8.8C493.2,473,491.1,472,489.7,470.7L489.7,470.7z"
          />
        </g>
        <g id="Right_Hand">
          <path
            id="Right_Thumb"
            className="st23"
            d="M587.6,470.7c2.3-2,3.3-5.2,2.5-8.4c-1.3-5.4-7.1-9.4-13-8.8s-9.6,5.5-8.3,11 c1.3,5.4,7.1,9.4,13,8.8C584.1,473,586,472,587.6,470.7L587.6,470.7z"
          />
          <ellipse
            id="Right_Hand_00000078009893088700932970000000317250906486600832_"
            className="st23"
            cx={600}
            cy={482.5}
            rx={22.8}
            ry={26.3}
          />
        </g>
      </g>
    </g>
    <g id="Gollum">
      <g id="gollum_x5F_head">
        <path
          id="golem_x5F_dome_x5F_piece"
          className="st39"
          d="M216,416.5c1.9-4.2,4-8.4,5.9-12.7c1.2-2.5,2.3-5.1,3.5-7.6 c1.4-3,1.9-4.3,4.8-6.3c2.8-1.8,5.5-3.5,8.6-4.9c13.5-6.9,29.1-10.4,44.3-10.6s31.3,3.1,45.2,9.6c6,2.8,11.9,7,15.3,12.8 c5.2,8.8,8.7,18.3,13,27.6c4.1,8.9,9.5,18.2,6.6,28.5c-6.5,22.9-31,37.4-52.7,42.8c-25.9,6.4-53.8,3.3-76.9-10.4 c-7.1-4.2-13.5-9.6-18.9-15.9c-4.3-5.1-8-11-9.5-17.5c-2.2-9,1.7-15.6,5.4-23.4L216,416.5L216,416.5z"
        />
        <g id="gollum_x5F_features">
          <g id="golem_x5F_right_x5F_ear">
            <polygon
              className="st40"
              points="377.8,404.5 362.5,435.3 358.5,443.5 355.4,425.1 355.3,424.2 353.2,419.8 352.5,418.3 355.4,416  374.9,397.9 376.3,401 375.7,402.8 376.9,402.4 377,402.5  "
            />
            <polygon
              className="st32"
              points="353,419.9 374.3,400.1 376,404.3 360.7,436.3  "
            />
          </g>
          <g id="golem_x5F_left_x5F_ear">
            <path
              className="st40"
              d="M212.8,415.1l-4-3.7c-0.2,0.4-0.6,0.7-1,1c-0.5,0.4-1,0.5-1.6,0.5c-2.2,0-3.9-2.5-4.1-5.7 c0-0.2,0-0.4,0-0.6c0-0.4,0-0.7,0.1-1.2l-8.9-8.3l-2.8,6.5l15.2,30.9l4.1,8.2l3.3-19.3l2-4.3l0.7-1.6L212.8,415.1z"
            />
            <path
              className="st32"
              d="M214.9,418.9l-2,4.3l-5.7,12.1l-15.4-32l1.7-4.2l8.6,8c0.2,3.3,1.9,5.7,4.1,5.7c0.6,0,1.1-0.1,1.6-0.5 L214.9,418.9z"
            />
          </g>
          <g id="golem_x5F_left_x5F_eye">
            <path
              className="st26"
              d="M272.9,422.7c-0.1,0.4-0.1,0.8-0.2,1.2c-1.3,5-3.7,9.4-6.8,12.7l-0.4,0.4l0,0c-3.5,3.5-7.8,5.8-12.6,6 c-0.4,0-0.8,0-1.2,0c-5.3-0.1-10.1-2.4-13.8-6.4c-3.2-3.3-5.5-7.8-6.7-12.8c-0.1-0.4-0.2-0.7-0.2-1.2h14.1 c0,0.4-0.1,0.7-0.1,1.2c0,4.6,2.9,8.2,6.5,8.2s6.5-3.6,6.5-8.2c0-0.4,0-0.8-0.1-1.2L272.9,422.7L272.9,422.7z"
            />
            <polygon
              id="eye_shadow_00000059280207280987431580000000904889293784918445_"
              className="st27"
              points="231.1,423.9 272.6,423.9  273.1,422.7 230.9,422.7  "
            />
            <path
              id="pupil_00000106836198372507111950000006657407328052407433_"
              className="st31"
              d="M258.1,426.4c0,3.6-2.9,6.5-6.5,6.5 s-6.5-2.9-6.5-6.5c0-0.4,0-0.6,0.1-1c0.5-3.1,3.1-5.7,6.5-5.7c3.3,0,6,2.4,6.5,5.7C258,425.8,258.1,426.2,258.1,426.4z"
            />
            <ellipse className="st29" cx={253.4} cy={432.1} rx={3} ry={3.9} />
            <g id="gollum_x5F_upperlid_x5F_eyelash">
              <rect
                id="gollum_x5F_left_x5F_eyelash"
                x={230}
                y={418.9}
                className="st31"
                width={43.4}
                height={3.7}
              />
              <path
                id="gollum_x5F_left_x5F_upperlid"
                className="st41"
                d="M252,418.9l-21.6-0.1c0.1-8.9,9.8-16.3,21.6-16.3 c11.8,0,21.6,7.4,21.6,16.4H252z"
              />
            </g>
            <path
              id="gollum_x5F_left_x5F_lower_x5F_eyelid"
              className="st32"
              d="M265.9,436.6l-0.4,0.4l0,0c-3.5,3.5-7.8,5.8-12.6,6 c-0.4,0-0.8,0-1.2,0c-5.3-0.1-10.1-2.4-13.8-6.4l0,0h13.8H265.9z"
            />
          </g>
          <g id="golem_x5F_right_x5F_eye">
            <path
              id="sclera_00000096780552603661387700000012248456918550045370_"
              className="st26"
              d="M292.1,422.7c0.1,0.4,0.1,0.8,0.2,1.2 c2.8,11.1,11,19.2,20.7,19.2c9.8,0,18.1-8.1,20.7-19.2c0.1-0.4,0.2-0.7,0.2-1.2h-14.2c0,0.4,0.1,0.7,0.1,1.2 c0,4.6-2.9,8.2-6.5,8.2s-6.5-3.6-6.5-8.2c0-0.4,0-0.8,0.1-1.2H292.1z"
            />
            <polygon
              id="eye_shadow_00000174592296456664756880000007218965432717228989_"
              className="st27"
              points="333.8,423.9 292.4,423.9  291.9,422.7 334.2,422.7  "
            />
            <path
              id="gollum_x5F_right_x5F_pupil"
              className="st31"
              d="M306.9,426.4c0,3.6,2.9,6.5,6.5,6.5s6.5-2.9,6.5-6.5c0-0.4,0-0.6-0.1-1 c-0.5-3.1-3.1-5.7-6.5-5.7c-3.3,0-6,2.4-6.5,5.7C306.9,425.8,306.9,426.2,306.9,426.4z"
            />
            <ellipse
              id="gollum_x5F_right_x5F_eye_x5F_highlight"
              className="st29"
              cx={316.3}
              cy={432.1}
              rx={3}
              ry={3.9}
            />
            <rect
              id="gollum_x5F_right_x5F_eyelash"
              x={291.4}
              y={418.9}
              className="st31"
              width={43.4}
              height={3.7}
            />
            <path
              id="gollum_x5F_right_x5F_lower_x5F_eyelid_00000132071278217579723230000009005009462936974992_"
              className="st32"
              d=" M299.1,436.6l0.4,0.4l0,0c3.5,3.5,7.8,5.8,12.6,6c0.4,0,0.8,0,1.2,0c5.3-0.1,10.1-2.4,13.8-6.4l0,0h-13.8H299.1z"
            />
            <path
              id="gollum_x5F_right_x5F_lower_x5F_eyelid"
              className="st42"
              d="M291.8,428l0.6,0.9l0,0c5.3,8.2,11.8,13.6,19.1,14.1 c0.6,0,1.2,0,1.8,0c8-0.2,15.3-5.6,20.9-15l0,0h-20.9H291.8z"
            />
            <path
              id="gollum_x5F_right_x5F_eyelid"
              className="st41"
              d="M313.2,418.9l21.6-0.1c-0.1-8.9-9.8-16.3-21.6-16.3s-21.6,7.4-21.6,16.4 H313.2z"
            />
          </g>
          <path
            id="Nose_00000102530236212527710990000016904965645554811581_"
            className="st32"
            d="M287.8,447.4c0,1-0.4,1.9-0.8,2.7 c-0.4-0.4-0.8-0.6-1.4-0.6c-1,0-1.8,0.7-1.8,1.7c0,0.4,0.1,0.6,0.2,1c-0.4,0.1-0.8,0.1-1.3,0.1s-0.8,0-1.2-0.1 c0.2-0.2,0.4-0.6,0.4-1c0-1-0.8-1.7-1.8-1.7c-0.6,0-1.1,0.2-1.4,0.7c-0.6-0.7-0.8-1.7-0.8-2.8c0-2.7,2.3-4.8,5.1-4.8 C285.5,442.6,287.8,444.7,287.8,447.4z"
          />
          <polygon
            className="st43"
            points="287.8,448.9 303.2,451.5 321.3,478.1 303.2,456.3  "
          />
          <polygon
            className="st43"
            points="277.5,448.9 262.1,451.5 243.9,478.1 262.1,456.3  "
          />
          <rect
            id="Mouth_00000165936465108171261600000018443307114201386660_"
            x={266.7}
            y={461.4}
            className="st31"
            width={33.5}
            height={2.2}
          />
          <polygon
            className="st29"
            points="272.5,463.7 269.6,471 266.7,463.5  "
          />
          <polygon
            className="st29"
            points="275,463.7 273.5,467.2 272.2,463.5  "
          />
          <polygon
            className="st29"
            points="281.6,463.7 280.2,467.2 278.8,463.5  "
          />
          <polygon
            className="st29"
            points="295.1,463.7 293.7,467.2 292.2,463.5  "
          />
          <polygon
            className="st29"
            points="294.6,463.8 297.5,471 300.3,463.5  "
          />
          <path className="st44" d="M229.4,394.3L229.4,394.3z" />
          <path
            id="gollum_x5F_left_x5F_hair_x5F_three"
            className="st45"
            d="M227.3,397.9l-24.2,42.4c0,0-5.3,42.9-5.1,46.5"
          />
          <path
            id="gollum_x5F_left_x5F_hair_x5F_two"
            className="st46"
            d="M235.6,391.3c0,0-35.8,47-32.1,70.1c3.7,23.3,3,44.9-0.4,49.3 c-3.4,4.5,3.6,40.3,3.6,40.3"
          />
          <path
            id="gollum_x5F_left_x5F_hair_x5F_one"
            className="st47"
            d="M238.8,397c0,0-29.3,31.1-26.3,46.2s2.5,29.7-0.2,32.6 s3.8,25.8,3.8,25.8"
          />
          <path
            id="right_x5F_hair_x5F_two"
            className="st48"
            d="M338.4,397c0,0,7,17.6,14.7,28.5s12.1,20.3,8.9,35.9c-3,15.7-11.8,32.2-5.7,41 c6.1,8.8-1.3,34.1-1.3,34.1"
          />
          <path
            id="right_x5F_hair_x5F_one"
            className="st49"
            d="M334.8,402.5c0,0,33.9,31.1,30.4,46.2c-3.5,15.2-2.9,29.7,0.4,32.6 s-3.4,26.5-3.4,26.5"
          />
          <polygon
            id="bl_x5F_laughline"
            className="st43"
            points="245,483.9 254,494.2 243.9,485.8  "
          />
          <polygon
            id="br_x5F_laughline"
            className="st43"
            points="320.3,484.9 311.3,495.1 321.3,486.8  "
          />
        </g>
      </g>
      <rect
        id="gollum_x5F_neck"
        x={273.7}
        y={476}
        className="st39"
        width={18.6}
        height={41.1}
      />
      <path
        id="gollum_x5F_body"
        className="st39"
        d="M303,553.4h-39.9V506c0-3.4,2.8-6.1,6.1-6.1h27.6c3.5,0,6.3,2.8,6.3,6.3v47.3L303,553.4 L303,553.4z"
      />
      <g id="gollum_x5F_controller_00000128478944557176670960000015930151561059717778_">
        <rect
          id="controller_x5F_base_00000047062431611672034570000013825857739451134864_"
          x={265.1}
          y={518.2}
          className="st36"
          width={33.6}
          height={7.5}
        />
        <rect
          id="left_x5F_trigger_00000125581508034569464910000011468859665021989309_"
          x={267.3}
          y={521.3}
          className="st37"
          width={7.5}
          height={1.4}
        />
        <rect
          id="right_x5F_trigger_00000005987292241046142540000013119328856841840279_"
          x={289.2}
          y={521.3}
          className="st37"
          width={7.5}
          height={1.4}
        />
        <g id="gollum_x5F_left_x5F_joystick_00000128461304383755335820000005735914441825588620_">
          <ellipse
            id="joystick_00000178908868609405177140000004868961481223087253_"
            className="st36"
            cx={268.6}
            cy={516.4}
            rx={2.3}
            ry={0.6}
          />
          <ellipse
            id="joystick_00000015319690249593409330000002348446675472777125_"
            className="st38"
            cx={268.6}
            cy={516.6}
            rx={2.3}
            ry={0.3}
          />
          <rect
            id="joystick_stem_00000121253818043368298000000017985029913011688887_"
            x={268.1}
            y={516.5}
            className="st36"
            width={1.1}
            height={3.2}
          />
        </g>
        <g id="gollum_x5F_right_x5F_joystick_00000076598673013303650120000010143786622556055203_">
          <ellipse
            id="joystick_00000161596351894726082870000000083861028144554159_"
            className="st36"
            cx={295.2}
            cy={516.3}
            rx={2.3}
            ry={0.6}
          />
          <ellipse
            id="joystick_00000132071263982042117580000006422774361304486311_"
            className="st38"
            cx={295.2}
            cy={516.5}
            rx={2.3}
            ry={0.3}
          />
          <rect
            id="joystick_stem_00000118381481336224120620000013974346836277484175_"
            x={294.8}
            y={516.4}
            className="st36"
            width={1}
            height={3.2}
          />
        </g>
        <g id="gollum_x5F_left_x5F_hand">
          <ellipse
            id="Left_Hand_00000029757115715398315890000016041126640183786665_"
            className="st50"
            cx={255.4}
            cy={522.9}
            rx={9.7}
            ry={11.2}
          />
          <path
            id="left_Thumb_00000026136603452255903570000012542389448711718302_"
            className="st50"
            d="M260.8,516.9c-1-0.9-1.4-2.2-1.1-3.6 c0.6-2.3,3-4,5.5-3.8s4.1,2.3,3.5,4.7c-0.6,2.3-3,4-5.5,3.8C262.3,517.9,261.4,517.5,260.8,516.9L260.8,516.9z"
          />
        </g>
        <g id="gollum_x5F_right_x5F_hand">
          <path
            id="Right_Thumb_00000088132775379187543520000017621683487739379601_"
            className="st50"
            d="M302.5,516.9c1-0.9,1.4-2.2,1.1-3.6 c-0.6-2.3-3-4-5.5-3.8s-4.1,2.3-3.5,4.7c0.6,2.3,3,4,5.5,3.8C301,517.9,301.8,517.5,302.5,516.9L302.5,516.9z"
          />
          <ellipse
            id="Right_Hand_00000009576914711784024850000004339126712163796636_"
            className="st50"
            cx={307.8}
            cy={521.9}
            rx={9.7}
            ry={11.2}
          />
        </g>
      </g>
    </g>
    <g id="Frodo">
      <polyline
        id="frodo_x5F_shirt"
        className="st51"
        points="742.8,539.5 742.8,580.9 841.3,580.9 841.3,530.7 802.7,476.4 799.7,482.5  797.8,478.3 786.2,478.3 742.8,539.5  "
      />
      <path
        id="frodo_x5F_necklace"
        className="st52"
        d="M795.6,452.1c7.1,0,12.6,9.1,12.8,20.3c0.3,12-5.4,21.4-12.8,20.3 c-7.1-1-12.8-9.1-12.8-20.3S788.6,452.1,795.6,452.1z"
      />
      <path
        id="frodo_x5F_neck"
        className="st23"
        d="M803.1,472.1h-15.9c-1.4,0-2.7-1.2-2.7-2.7v-23.6h21.2v23.6 C805.8,470.9,804.6,472.1,803.1,472.1z"
      />
      <g id="frodo_x5F_head">
        <path
          id="frodo_x5F_hair_x5F_base"
          className="st53"
          d="M733.6,332.1h124.2c5.2,0,9.4,4.2,9.4,9.4v97.7c0,5.2-4.2,9.4-9.4,9.4H733.6 c-5.2,0-9.4-4.2-9.4-9.4v-97.7C724.2,336.3,728.4,332.1,733.6,332.1z"
        />
        <path
          id="frodo_x5F_dome_x5F_piece"
          className="st23"
          d="M843.6,452.5h-94.8c-6.5,0-11.9-5.3-11.9-11.9v-82.1h118.8v81.9 C855.7,447.1,850.2,452.5,843.6,452.5z"
        />
        <g id="frodo_x5F_left_x5F_eye">
          <path
            id="sclera_00000116916961721890690110000010765833582136416661_"
            className="st26"
            d="M780.9,400.4c0,0.2-0.1,0.5-0.2,0.7 c-1.9,6.4-7.8,11-14.8,11s-12.9-4.6-14.8-11c-0.1-0.2-0.1-0.5-0.2-0.7H761c0,0.2,0,0.5,0,0.7c0,2.5,2,4.7,4.7,4.7 c2.5,0,4.7-2,4.7-4.7c0-0.2,0-0.5,0-0.7H780.9z"
          />
          <polygon
            id="frodo_x5F_left_x5F_eye_x5F_shadow"
            className="st27"
            points="751,401.1 780.8,401.1 781,400.4 750.9,400.4  "
          />
          <path
            id="frodo_x5F_left_x5F_pupil"
            className="st54"
            d="M770.3,401.1c0,2.5-2,4.7-4.7,4.7c-2.5,0-4.7-2-4.7-4.7c0-0.2,0-0.5,0-0.7 c0.4-2.3,2.3-4,4.6-4c2.4,0,4.3,1.7,4.6,4C770.3,400.6,770.3,400.9,770.3,401.1z"
          />
          <rect
            id="frodo_x5F_left_x5F_eyebrow"
            x={747.2}
            y={383.3}
            className="st55"
            width={38.2}
            height={7.8}
          />
          <circle
            id="frodo_x5F_left_x5F_eye_x5F_highlight"
            className="st29"
            cx={767.1}
            cy={405.8}
            r={2.2}
          />
          <path
            id="frodo_x5F_left_x5F_bottom_x5F_eyelid"
            className="st30"
            d="M777.3,407.3c-8.2,7.4-15.9,6.4-23.2,0H777.3z"
          />
          <rect
            id="frodo_x5F_left_x5F_eyelash"
            x={749.8}
            y={396.2}
            className="st31"
            width={31.1}
            height={4.3}
          />
        </g>
        <g id="frodo_x5F_right_x5F_eye">
          <path
            id="frodo-right-sclera"
            className="st26"
            d="M810.3,400.4c0,0.2,0.1,0.5,0.2,0.7c1.9,6.4,7.8,11,14.8,11s12.9-4.6,14.8-11 c0.1-0.2,0.1-0.5,0.2-0.7h-10.1c0,0.2,0,0.5,0,0.7c0,2.5-2,4.7-4.7,4.7c-2.5,0-4.7-2-4.7-4.7c0-0.2,0-0.5,0-0.7H810.3z"
          />
          <polygon
            id="frodo-right-eye-shadow"
            className="st27"
            points="840.2,401.1 810.6,401.1 810.2,400.4 840.5,400.4  "
          />
          <path
            id="frodo_x5F_right_x5F_pupil"
            className="st54"
            d="M820.9,401.1c0,2.5,2,4.7,4.7,4.7s4.7-2,4.7-4.7c0-0.2,0-0.5,0-0.7 c-0.4-2.3-2.3-4-4.6-4c-2.4,0-4.3,1.7-4.6,4C820.9,400.6,820.9,400.9,820.9,401.1z"
          />
          <rect
            id="frodo_x5F_right_x5F_eyelash"
            x={809.9}
            y={396.2}
            className="st31"
            width={31.1}
            height={4.3}
          />
          <rect
            id="frodo_x5F_right_x5F_eyebrow"
            x={806}
            y={383.4}
            className="st55"
            width={38.2}
            height={7.8}
          />
          <circle
            id="frodo_x5F_right_x5F_eye_x5F_highlight"
            className="st29"
            cx={828.9}
            cy={405.8}
            r={2.2}
          />
          <path
            id="frodo_x5F_bottom_x5F_right_x5F_eyelid"
            className="st30"
            d="M836.7,407.3c-7.3,6.4-15,7.4-23.2,0H836.7z"
          />
        </g>
        <path
          id="frodo_x5F_nose"
          className="st32"
          d="M798.3,412.6c0,0.6-0.2,1.1-0.5,1.6c-0.2-0.2-0.5-0.4-0.8-0.4c-0.6,0-1.1,0.5-1.1,1 c0,0.2,0.1,0.4,0.1,0.5c-0.2,0-0.5,0.1-0.8,0.1c-0.2,0-0.5,0-0.7-0.1c0.1-0.1,0.2-0.4,0.2-0.5c0-0.6-0.5-1-1.1-1 c-0.4,0-0.7,0.1-0.8,0.4c-0.4-0.5-0.5-1-0.5-1.6c0-1.6,1.4-2.8,3.1-2.8C796.8,409.8,798.3,411.1,798.3,412.6z"
        />
        <rect
          id="frodo_x5F_mouth"
          x={782.5}
          y={433.2}
          className="st31"
          width={25.4}
          height={1.8}
        />
        <g id="frodo_x5F_loose_x5F_hair">
          <path
            className="st53"
            d="M795.1,358.4c0,0,1.9,17.1-3.1,13.7c-5.1-3.4,3.6,6.6,3.6,6.6l14.2-26.3"
          />
          <path
            className="st53"
            d="M770.3,358.4c0,0,2,15.1-5.8,15.1s-19.5-2-13.6-4c5.9-1.9,15.3-5.5,15.3-11.1c0-5.4,24.2-11.9,24.2-11.9"
          />
          <path
            className="st53"
            d="M724.2,339.8c0,0-9.4,33-7,40.7c2.3,7.6,7.2,14.8-0.4,25.2c-7.6,10.4-14,13.7-9.6,23.6 c4.3,9.9,7,23.8,5.3,26.6c-1.7,2.7-13.7,7.2-5.1,8.8c8.7,1.5,12.1-5.6,12.1-5.6l7-40.5"
          />
          <path
            className="st53"
            d="M863.8,334.4c0,0,9.4,34.5,7,42.4c-2.3,8-7.2,15.4,0.4,26.3c7.6,10.8,14,14.3,9.6,24.6 c-4.3,10.3-7,24.9-5.3,27.7c1.7,2.9,13.7,7.5,5.1,9.2c-8.7,1.6-12.1-5.8-12.1-5.8l-7-42.3"
          />
          <polyline
            className="st53"
            points="834.1,358.4 844.7,370.1 846.9,380 849.2,363.2 843.7,352.6  "
          />
        </g>
      </g>
      <g id="frodo_x5F_ring">
        <ellipse className="st56" cx={795.7} cy={494.9} rx={2.5} ry={3.6} />
        <ellipse className="st57" cx={795.7} cy={494.9} rx={3} ry={4} />
      </g>
      <g id="frodo_x5F_cape">
        <polygon
          className="st58"
          points="784.5,462.8 777.3,462.7 784.5,458.7  "
        />
        <polygon
          className="st58"
          points="790.6,472.1 713.5,580.9 740.3,459 784.8,458.6 777.3,462.7 773.7,464.8  "
        />
        <polygon
          className="st58"
          points="805.8,458.7 813,462.7 805.8,462.8  "
        />
        <polygon
          className="st58"
          points="799.7,472.1 816.6,464.8 813,462.7 805.5,458.6 850,459 876.8,580.9  "
        />
        <path
          className="st59"
          d="M713.5,580.9c0,0,9.6-11.6,15.2-8.6c5.5,3,14.1,8.6,14.1,8.6v-41.4L713.5,580.9z"
        />
        <path
          className="st59"
          d="M878.3,580.9c0,0-12.3-14-19.3-10.4s-17.8,10.4-17.8,10.4v-50.2L878.3,580.9z"
        />
        <polyline
          className="st29"
          points="783.9,458.3 790.8,470 765.2,470.6 783.9,458.3  "
        />
        <polyline
          className="st29"
          points="807.6,458.3 800.7,470 826.3,470.6 807.6,458.3  "
        />
        <polygon
          className="st60"
          points="805.8,467.8 795.9,460.8 795.9,467.8 776.6,477.6 798.2,477.6 800,481.3 805.2,472.3  "
        />
        <polygon
          className="st61"
          points="805.8,467.8 795.9,460.8 795.9,467.8 776.6,477.6 798.2,477.6 800,481.3 805.2,472.3  "
        />
      </g>
      <g id="frodo_x5F_hands">
        <g id="gandalf_x5F_controller_00000116219004402636598880000014732073642398017697_">
          <rect
            id="controller_x5F_base_00000072270103870488483220000001572447074617880971_"
            x={773}
            y={514.8}
            className="st36"
            width={41.2}
            height={9.3}
          />
          <rect
            id="left_x5F_trigger_00000106125515430815200430000013350015769519806645_"
            x={775.6}
            y={518.6}
            className="st37"
            width={9.2}
            height={1.7}
          />
          <rect
            id="right_x5F_trigger_00000070838045924344886330000011853563990939802514_"
            x={802.5}
            y={518.6}
            className="st37"
            width={9.2}
            height={1.7}
          />
          <g id="gandalf_x5F_left_x5F_joystick_00000054241518990156392870000017943014607950471577_">
            <ellipse
              id="joystick_00000131359503940940325260000003714098716423079603_"
              className="st36"
              cx={777.3}
              cy={512.6}
              rx={2.9}
              ry={0.7}
            />
            <ellipse
              id="joystick_00000036245642192814184580000012497707280191440530_"
              className="st38"
              cx={777.3}
              cy={512.9}
              rx={2.9}
              ry={0.4}
            />
            <rect
              id="joystick_stem_00000105397662519409591150000005861734489372481681_"
              x={776.6}
              y={512.7}
              className="st36"
              width={1.3}
              height={3.9}
            />
          </g>
          <g id="gandalf_x5F_right_x5F_joystick_00000168076063533878771720000005383042155609084055_">
            <ellipse
              id="joystick_00000100349350909923233010000004538096356473228717_"
              className="st36"
              cx={809.9}
              cy={512.5}
              rx={2.9}
              ry={0.7}
            />
            <ellipse
              id="joystick_00000005989155126107555890000016876288878633270957_"
              className="st38"
              cx={809.9}
              cy={512.8}
              rx={2.9}
              ry={0.4}
            />
            <rect
              id="joystick_stem_00000006694172545502466860000006380509967374435204_"
              x={809.4}
              y={512.6}
              className="st36"
              width={1.3}
              height={3.9}
            />
          </g>
        </g>
        <g id="Left_hand_00000163070905204595219560000007446617777871804087_">
          <ellipse
            id="Left_Hand_00000132807933355733726310000002451635515018843568_"
            className="st62"
            cx={761}
            cy={520.6}
            rx={11.9}
            ry={13.8}
          />
          <path
            id="left_Thumb_00000051383756601282355600000007787932568175249041_"
            className="st62"
            d="M767.6,513.2c-1.2-1-1.7-2.7-1.3-4.4 c0.7-2.8,3.7-4.9,6.8-4.6s5,2.9,4.3,5.8c-0.7,2.9-3.7,4.9-6.8,4.6C769.4,514.4,768.3,513.9,767.6,513.2L767.6,513.2z"
          />
        </g>
        <g id="Right_Hand_00000105391765151445055980000001204487535791705014_">
          <path
            id="Right_Thumb_00000125596803423687990130000001612073441975414949_"
            className="st62"
            d="M818.9,513.2c1.2-1,1.7-2.7,1.3-4.4 c-0.7-2.8-3.7-4.9-6.8-4.6s-5,2.9-4.3,5.8c0.7,2.8,3.7,4.9,6.8,4.6C817.1,514.4,818.1,513.9,818.9,513.2L818.9,513.2z"
          />
          <ellipse
            id="Right_Hand_00000024722742091658931530000010789047454963357100_"
            className="st62"
            cx={825.4}
            cy={519.4}
            rx={11.9}
            ry={13.8}
          />
        </g>
      </g>
    </g>
    <g id="Television">
      <rect
        id="television_x5F_front"
        x={219.8}
        y={534.8}
        className="st63"
        width={615}
        height={334.8}
      />
      <rect
        id="television_x5F_back"
        x={219.8}
        y={558.2}
        className="st64"
        width={615}
        height={382.2}
      />
    </g>
    <g id="bottle_x5F_four">
      <path
        className="st65"
        d="M163.9,503.8l-11.4,2.8c-2.1,1.3-3.3,2.8-3,4.1l13.2,51.9l18.7-4.8l-13.2-51.9 C167.8,504.7,166.2,503.9,163.9,503.8z"
      />
      <path
        className="st65"
        d="M153.1,506.3c3.7-0.9,6.7-1.7,10.3-2.6l-5-15.8l-8.7,2.2l3.3,16.4l10.5-2.6v-0.2 C159.8,504.6,156.8,505.4,153.1,506.3z"
      />
      <path
        className="st66"
        d="M157.8,488.7l-7.2,1.8l3.2,15.6c3.1-0.8,5.7-1.5,8.6-2.2L157.8,488.7z"
      />
      <path
        className="st66"
        d="M163,504.4l-0.2-0.7c-3.2,0.8-6.1,1.6-9.4,2.4l0.1,0.6c-1.7,1.2-2.7,2.6-2.4,3.8l12.9,50.7l15.5-3.9 l-12.9-50.7C166.3,505.4,164.9,504.7,163,504.4z"
      />
      <path
        className="st67"
        d="M157.6,489.3l-6.4,1.6l3.2,15c2.7-0.7,5.1-1.3,7.7-2L157.6,489.3z"
      />
      <path
        className="st67"
        d="M162.7,504.8l-0.3-1c-2.8,0.7-5.4,1.4-8.4,2.1l0.2,0.9c-1.5,1.1-2.4,2.5-2,3.7l12.7,49.7l13.7-3.5L166,507 C165.7,505.9,164.4,505.1,162.7,504.8z"
      />
      <ellipse
        transform="matrix(0.969 -0.2471 0.2471 0.969 -115.9209 53.1218)"
        className="st65"
        cx={153.7}
        cy={488.4}
        rx={5.6}
        ry={1.7}
      />
      <ellipse
        transform="matrix(0.969 -0.2471 0.2471 0.969 -115.7284 53.072)"
        className="st68"
        cx={153.6}
        cy={487.6}
        rx={4.1}
        ry={0.7}
      />
    </g>
    <g id="bottle_x5F_three">
      <path
        className="st65"
        d="M1060.5,447.3l-11.8-0.1c-2.4,0.7-3.9,1.9-3.9,3.2V504h19.3v-53.6C1064.1,449.1,1062.7,448,1060.5,447.3z"
      />
      <path
        className="st65"
        d="M1049.4,447.1c3.8,0,6.9,0,10.6,0l-0.9-16.5h-9l-0.9,16.7l10.8,0.1v-0.2 C1056.3,447.1,1053.2,447.1,1049.4,447.1z"
      />
      <path
        className="st66"
        d="M1058.3,431.2h-7.4l-0.7,15.9c3.2,0,5.9,0,8.9,0L1058.3,431.2z"
      />
      <path
        className="st66"
        d="M1059.4,447.7V447c-3.3,0-6.3,0-9.7,0v0.6c-2,0.7-3.3,1.8-3.3,3.1V503h16v-52.4 C1062.4,449.5,1061.2,448.4,1059.4,447.7z"
      />
      <path
        className="st67"
        d="M1058,431.7h-6.6l-0.6,15.3c2.8,0,5.2,0,7.9,0L1058,431.7z"
      />
      <path
        className="st67"
        d="M1059.1,448v-1c-2.9,0-5.6,0-8.6,0v0.9c-1.8,0.7-2.9,1.8-2.9,3v51.2h14.2v-51.2 C1061.7,449.7,1060.7,448.7,1059.1,448z"
      />
      <ellipse className="st65" cx={1054.4} cy={429.8} rx={5.6} ry={1.7} />
      <ellipse className="st68" cx={1054.5} cy={429.1} rx={4.1} ry={0.7} />
    </g>
    <g id="bottle_x5F_two_00000014612656483464061070000005744252807753493390_">
      <path
        className="st65"
        d="M1092,450.4l-11.8-0.1c-2.4,0.7-3.9,1.9-3.9,3.2V507h19.3v-53.6C1095.6,452.2,1094.2,451.1,1092,450.4z"
      />
      <path
        className="st65"
        d="M1080.9,450.2c3.8,0,6.9,0,10.6,0l-0.9-16.5h-9l-0.9,16.7l10.8,0.1v-0.2 C1087.9,450.2,1084.7,450.2,1080.9,450.2z"
      />
      <path
        className="st66"
        d="M1089.8,434.3h-7.4l-0.7,15.9c3.2,0,5.9,0,8.9,0L1089.8,434.3z"
      />
      <path
        className="st66"
        d="M1091,450.8v-0.7c-3.3,0-6.3,0-9.7,0v0.6c-2,0.7-3.3,1.8-3.3,3.1v52.4h16v-52.4 C1093.9,452.6,1092.8,451.5,1091,450.8z"
      />
      <path
        className="st67"
        d="M1089.5,434.9h-6.6l-0.6,15.3c2.8,0,5.2,0,7.9,0L1089.5,434.9z"
      />
      <path
        className="st67"
        d="M1090.6,451.1v-1c-2.9,0-5.6,0-8.6,0v0.9c-1.8,0.7-2.9,1.8-2.9,3v51.2h14.2V454 C1093.2,452.9,1092.2,451.8,1090.6,451.1z"
      />
      <ellipse className="st65" cx={1086} cy={433} rx={5.6} ry={1.7} />
      <ellipse className="st68" cx={1086.1} cy={432.2} rx={4.1} ry={0.7} />
    </g>
    <g id="bottle_x5F_five">
      <path
        className="st65"
        d="M199.2,606.2l-11.8-0.1c-2.4,0.7-3.9,1.9-3.9,3.2v53.6h19.3v-53.6C202.8,608,201.4,606.9,199.2,606.2z"
      />
      <path
        className="st65"
        d="M188.1,606c3.8,0,6.9,0,10.6,0l-0.9-16.5h-9l-0.9,16.7l10.8,0.1V606C195,606,191.9,606,188.1,606z"
      />
      <path
        className="st66"
        d="M197,590.1h-7.4l-0.7,15.9c3.2,0,5.9,0,8.9,0L197,590.1z"
      />
      <path
        className="st66"
        d="M198.1,606.6v-0.7c-3.3,0-6.3,0-9.7,0v0.6c-2,0.7-3.3,1.8-3.3,3.1V662h16v-52.4 C201.1,608.4,199.9,607.3,198.1,606.6z"
      />
      <path
        className="st67"
        d="M196.7,590.7H190l-0.6,15.3c2.8,0,5.2,0,7.9,0L196.7,590.7z"
      />
      <path
        className="st67"
        d="M197.7,606.9v-1c-2.9,0-5.6,0-8.6,0v0.9c-1.8,0.7-2.9,1.8-2.9,3V661h14.2v-51.2 C200.4,608.7,199.4,607.6,197.7,606.9z"
      />
      <ellipse className="st65" cx={193.1} cy={588.8} rx={5.6} ry={1.7} />
      <ellipse className="st68" cx={193.2} cy={588} rx={4.1} ry={0.7} />
    </g>
    <g id="bottle_x5F_one">
      <path
        className="st65"
        d="M923.4,493.2l-11.7-1.6c-2.5,0.4-4.1,1.4-4.3,2.6l-7,53.1l19.1,2.5l7-53.1 C926.7,495.5,925.5,494.2,923.4,493.2z"
      />
      <path
        className="st65"
        d="M912.4,491.5c3.8,0.5,6.9,0.9,10.5,1.4l1.2-16.5l-8.9-1.2l-3,16.4l10.7,1.5v-0.2 C919.3,492.4,916.2,492,912.4,491.5z"
      />
      <path
        className="st66"
        d="M923.3,476.9l-7.4-1l-2.8,15.7c3.1,0.4,5.8,0.8,8.8,1.2L923.3,476.9z"
      />
      <path
        className="st66"
        d="M922.3,493.4l0.1-0.7c-3.3-0.4-6.2-0.8-9.7-1.3l-0.1,0.6c-2.1,0.4-3.5,1.4-3.6,2.7l-6.8,51.9l15.8,2.1 l6.8-51.9C925,495.6,924,494.4,922.3,493.4z"
      />
      <path
        className="st67"
        d="M922.9,477.4l-6.6-0.9l-2.6,15.1c2.7,0.4,5.2,0.7,7.8,1L922.9,477.4z"
      />
      <path
        className="st67"
        d="M921.9,493.7l0.1-1c-2.9-0.4-5.6-0.7-8.6-1.1l-0.1,0.9c-1.8,0.5-3.1,1.4-3.3,2.6l-6.7,50.8l14,1.8l6.7-50.8 C924.2,495.8,923.4,494.6,921.9,493.7z"
      />
      <ellipse
        transform="matrix(0.1299 -0.9915 0.9915 0.1299 328.9825 1325.1954)"
        className="st65"
        cx={919.6}
        cy={475.2}
        rx={1.7}
        ry={5.6}
      />
      <ellipse
        transform="matrix(0.1299 -0.9915 0.9915 0.1299 330.0511 1324.7716)"
        className="st68"
        cx={919.9}
        cy={474.3}
        rx={0.7}
        ry={4.1}
      />
    </g>
    <g id="can_x5F_one">
      <path
        className="st13"
        d="M1040.6,503.9h-15c-2.6,0-4.8-2.2-4.8-4.8V474c0-2.6,2.2-4.8,4.8-4.8h15c2.6,0,4.8,2.2,4.8,4.8v25.1 C1045.4,501.7,1043.3,503.9,1040.6,503.9z"
      />
      <ellipse className="st14" cx={1033.1} cy={470} rx={10.7} ry={1.5} />
      <ellipse className="st15" cx={1033} cy={470} rx={9.5} ry={0.8} />
      <path
        className="st16"
        d="M1026.7,487l-2.7,2c-1.5-2-1.5-4.4-0.1-5.6c1.4-1.1,3.9-0.5,5.5,1.5L1026.7,487z"
      />
      <path
        className="st17"
        d="M1027.2,487.3l2.7-2c1.5,2,1.5,4.4,0.1,5.6c-1.5,1.1-3.9,0.4-5.5-1.5L1027.2,487.3z"
      />
      <ellipse className="st18" cx={1032.4} cy={470.4} rx={2.6} ry={0.4} />
      <path
        className="st19"
        d="M1043.4,469.7c0,0.7-4,1.2-10,1.2s-10.8-0.6-10.8-1.3c0-0.7,4.8-1.3,10.8-1.3S1043.4,469,1043.4,469.7z"
      />
    </g>
    <g id="can_x5F_three">
      <path
        className="st13"
        d="M907,553.7l-13.7-6.2c-2.4-1.1-3.5-4-2.4-6.4l10.4-22.8c1.1-2.4,4-3.5,6.4-2.4l13.7,6.2 c2.4,1.1,3.5,4,2.4,6.4l-10.4,22.8C912.2,553.7,909.4,554.8,907,553.7z"
      />
      <ellipse
        transform="matrix(0.4133 -0.9106 0.9106 0.4133 62.9972 1137.3215)"
        className="st14"
        cx={914.1}
        cy={519.8}
        rx={1.5}
        ry={10.7}
      />
      <ellipse
        transform="matrix(0.4133 -0.9106 0.9106 0.4133 63.0681 1137.196)"
        className="st15"
        cx={914}
        cy={519.7}
        rx={0.8}
        ry={9.5}
      />
      <path
        className="st16"
        d="M901.3,532.6l-3.3,0.7c-0.5-2.4,0.4-4.7,2.2-5.1c1.8-0.4,3.8,1.2,4.4,3.6L901.3,532.6z"
      />
      <path
        className="st17"
        d="M901.6,533l3.3-0.7c0.5,2.4-0.5,4.7-2.2,5.1c-1.8,0.4-3.8-1.2-4.3-3.6L901.6,533z"
      />
      <ellipse
        transform="matrix(0.4133 -0.9106 0.9106 0.4133 62.5 1136.54)"
        className="st18"
        cx={913.2}
        cy={519.8}
        rx={0.4}
        ry={2.6}
      />
      <path
        className="st19"
        d="M923.7,523.7c-0.3,0.6-4.1-0.6-9.6-3.1c-5.4-2.5-9.6-5-9.3-5.6s4.9,0.8,10.4,3.3 C920.6,520.8,924,523.1,923.7,523.7z"
      />
    </g>
    <g id="can_x5F_two">
      <path
        className="st13"
        d="M1040.9,501.4l-0.4-15c-0.1-2.6,2-4.9,4.7-4.9l25.1-0.7c2.6-0.1,4.9,2,4.9,4.7l0.4,15c0.1,2.6-2,4.9-4.7,4.9 l-25.1,0.7C1043.2,506.1,1040.9,504,1040.9,501.4z"
      />
      <ellipse
        transform="matrix(0.9997 -2.612225e-02 2.612225e-02 0.9997 -12.5121 28.2378)"
        className="st14"
        cx={1074.5}
        cy={493}
        rx={1.5}
        ry={10.7}
      />
      <ellipse
        transform="matrix(0.9997 -2.612225e-02 2.612225e-02 0.9997 -12.5094 28.2403)"
        className="st15"
        cx={1074.6}
        cy={492.9}
        rx={0.8}
        ry={9.5}
      />
      <path
        className="st16"
        d="M1057.4,487.1l-2.1-2.7c1.9-1.5,4.4-1.6,5.6-0.3c1.2,1.4,0.6,3.9-1.3,5.5L1057.4,487.1z"
      />
      <path
        className="st17"
        d="M1057.1,487.6l2,2.7c-1.9,1.5-4.4,1.6-5.6,0.2s-0.6-3.9,1.4-5.5L1057.1,487.6z"
      />
      <ellipse
        transform="matrix(0.9997 -2.612225e-02 2.612225e-02 0.9997 -12.494 28.2271)"
        className="st18"
        cx={1074.1}
        cy={492.3}
        rx={0.4}
        ry={2.6}
      />
      <path
        className="st19"
        d="M1075.2,503.3c-0.7,0-1.3-4-1.4-10c-0.2-6,0.3-10.8,1-10.8s1.4,4.8,1.6,10.8 C1076.4,499.3,1075.9,503.3,1075.2,503.3z"
      />
    </g>
    <g id="bottle_x5F_two_00000118379237773775288780000013454191003194111107_">
      <path
        className="st65"
        d="M406.7,459.8l-20.5-0.2c-4.2,1.1-6.8,2.9-6.8,4.9v81.6H413v-81.7C413,462.6,410.6,460.9,406.7,459.8z"
      />
      <path
        className="st65"
        d="M387.4,459.5c6.6,0,12,0,18.5,0l-1.6-25.2h-15.7l-1.6,25.5l18.8,0.2v-0.3C399.6,459.5,394,459.5,387.4,459.5z "
      />
      <path
        className="st66"
        d="M402.9,435.3H390l-1.2,24.2c5.6,0,10.3,0,15.5,0L402.9,435.3z"
      />
      <path
        className="st66"
        d="M405,460.4v-1.1c-5.7,0-11,0-16.9,0v0.9c-3.5,1.1-5.7,2.7-5.7,4.7v79.9h27.9V465 C410,463.2,408.1,461.5,405,460.4z"
      />
      <path
        className="st67"
        d="M402.4,436.2h-11.5l-1,23.3c4.9,0,9.1,0,13.8,0L402.4,436.2z"
      />
      <path
        className="st67"
        d="M404.3,460.9v-1.5c-5.1,0-9.8,0-15,0v1.4c-3.1,1.1-5.1,2.7-5.1,4.6v78.1H409v-78.1 C408.8,463.6,407.1,462,404.3,460.9z"
      />
      <ellipse className="st65" cx={396.3} cy={433.3} rx={9.8} ry={2.6} />
      <ellipse className="st68" cx={396.5} cy={432.1} rx={7.1} ry={1.1} />
    </g>
    <rect x={35.7} y={530.5} className="st69" width={30.7} height={3.3} />
  </svg>
        </div>
    )
}


export default LoginAnimation;
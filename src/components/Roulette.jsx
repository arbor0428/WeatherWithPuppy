import React, { useRef, useEffect } from 'react';

const product = [
    "그래도 산책 나가기", '집에서 공놀이 1시간', "집에서 숨바꼭질 1시간", "실내 애견카페 가기"
];

const colors = [ "#f7a416", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"];

const Roulette = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        const newMake = () => {
        const [cw, ch] = [canvasRef.current.width / 2, canvasRef.current.height / 2];
        const arc = Math.PI / (product.length / 2);

        for (let i = 0; i < product.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = colors[i % (colors.length - 1)];
            ctx.moveTo(cw, ch);
            ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
            ctx.fill();
            ctx.closePath();
        }

        ctx.fillStyle = "#fff";
        ctx.font = "18px Pretendard";
        ctx.textAlign = "center";

        for (let i = 0; i < product.length; i++) {
            const angle = (arc * i) + (arc / 2);

            ctx.save();

            ctx.translate(
            cw + Math.cos(angle) * (cw - 50),
            ch + Math.sin(angle) * (ch - 50),
            );

            ctx.rotate(angle + Math.PI / 2);

            product[i].split(" ").forEach((text, j) => {
            ctx.fillText(text, 0, 30 * j);
            });

            ctx.restore();
        }
        };

        newMake();
    }, []);

    const rotate = () => {
        const $c = canvasRef.current;
        $c.style.transform = `initial`;
        $c.style.transition = `initial`;

        setTimeout(() => {
        const ran = Math.floor(Math.random() * product.length);

        const arc = 360 / product.length;
        const rotate = (ran * arc) + 3600 + (arc * 2) - (arc / 3);

        $c.style.transform = `rotate(-${rotate}deg)`;
        $c.style.transition = `2s`;

        setTimeout(() => alert(`${product[ran]} 당첨 !`), 2000);
        }, 1);
    };

    return (
        <div className="roulette">
        <canvas ref={canvasRef} width={300} height={300}></canvas>
        <button onClick={rotate}>룰렛 돌리기</button>
        </div>
    );
};

export default Roulette;
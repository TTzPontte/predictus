simple react hook to send window dimentions through Context

> __Usage __ Example__
>
> ```javascript
> function ShowWindowDimensions(props) {
>   const [width, height] = useWindowSize();
>   return (
>     <span>
>       Window size: {width} x {height}
>     </span>
>   );
> }
> ```
>
>

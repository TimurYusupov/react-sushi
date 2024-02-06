import { Link } from 'react-router-dom'

import styles from '../GoBackBtn/GoBackBtn.module.scss'

type TGoBackBtnProps = {
   backgroundColor: string
   padding: string
   width: string
   fontSize: string
   fontWeight: string
   textTransform: TTextTransform
   borderRadius: string
}

type TTextTransform =
   | 'none'
   | 'capitalize'
   | 'uppercase'
   | 'lowercase'
   | 'initial'
   | 'inherit'

const GoBackBtn: React.FC<TGoBackBtnProps> = ({
   backgroundColor,
   padding,
   width,
   fontSize,
   fontWeight,
   textTransform,
   borderRadius
}) => {
   const btnStyle = {
      backgroundColor,
      padding,
      width,
      fontSize,
      fontWeight,
      textTransform,
      borderRadius
   }

   return (
      <Link to="/" className={`${styles.goBackBtn}`} style={btnStyle}>
         <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M7 13L1 6.93015L6.86175 1"
               stroke="#D3D3D3"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
         <span>Go back</span>
      </Link>
   )
}

export default GoBackBtn

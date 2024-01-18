import styles from './Skeleton.module.scss'
import ContentLoader from 'react-content-loader'

const Skeleton = () => {
   return (
      <ContentLoader
         speed={3}
         width={340}
         height={131}
         viewBox="0 0 350 131"
         backgroundColor="#e6e3e3"
         foregroundColor="#e6e3e3"
      >
         <rect x="0" y="0" rx="0" ry="0" width="180" height="131" />
         <rect x="217" y="0" rx="0" ry="0" width="125" height="20" />
         <rect x="217" y="28" rx="0" ry="0" width="85" height="15" />
         <rect x="217" y="90" rx="19" ry="19" width="96" height="36" />
         <rect x="217" y="52" rx="0" ry="0" width="40" height="15" />
         <rect x="267" y="52" rx="0" ry="0" width="40" height="15" />
      </ContentLoader>
   )
}

export default Skeleton

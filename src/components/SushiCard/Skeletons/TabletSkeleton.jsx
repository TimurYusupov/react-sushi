import ContentLoader from 'react-content-loader'

const TabletSkeleton = () => {
   return (
      <ContentLoader
         speed={3}
         width={200}
         height={250}
         viewBox="0 0 200 250"
         backgroundColor="#e6e3e3"
         foregroundColor="#e6e3e3"
      >
         <rect x="0" y="0" rx="0" ry="0" width="150" height="135" />
         <rect x="0" y="144" rx="0" ry="0" width="131" height="15" />
         <rect x="0" y="166" rx="0" ry="0" width="87" height="15" />
         <rect x="0" y="185" rx="0" ry="0" width="50" height="15" />
         <rect x="62" y="186" rx="0" ry="0" width="50" height="15" />
         <rect x="0" y="209" rx="19" ry="19" width="87" height="34" />
      </ContentLoader>
   )
}

export default TabletSkeleton

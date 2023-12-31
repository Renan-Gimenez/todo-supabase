import { Skeleton as SkeletonChakra } from '@chakra-ui/react'

export function Skeleton() {
    return (
        <>
            {[1, 2, 3].map((index) => {
                return(
                    <SkeletonChakra
                        key={index}
                        height='56px'
                        bg='green.500'
                        color='white'
                        fadeDuration={1}
                        rounded="lg"
                        marginBottom={2}
                    />
                )
            })}
        </>
    );
}
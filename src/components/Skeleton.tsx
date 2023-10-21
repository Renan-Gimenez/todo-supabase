import { Skeleton as SkeletonChakra } from '@chakra-ui/react'

export function Skeleton() {
    return (
        <>
            {[1, 2, 3].map(() => {
                return(
                    <SkeletonChakra
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
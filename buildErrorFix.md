This document is to record the approach tried to fix the build error in brief in two lines.

Approach already Tried:

#1: Custom Props type definition for page component parameters
#2: Made the page component async and simplified params type structure to match Next.js 13+ requirements
#3: Imported Next.js Metadata type and used explicit PageProps interface with non-async component
#4: Used NextPage type from Next.js with proper generic type parameters for the page component
#5: Removed NextPage type and made component async with proper App Router Props type including searchParams
#6: Simplified to use a basic interface for params with async function component
#7: Modified PageParams to extend Promise and await the params in the component


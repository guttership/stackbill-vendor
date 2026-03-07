import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'default', size = 'default', asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none active:translate-y-[1px]',
          {
            'btn-brand hover:brightness-105':
              variant === 'default',
            'btn-secondary hover:-translate-y-[1px]':
              variant === 'outline',
            'rounded-xl px-3 py-2 hover:bg-black/5 transition-colors':
              variant === 'ghost',
            'bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80':
              variant === 'secondary',
          },
          {
            'h-11 py-2.5 px-5 text-sm': size === 'default',
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-7 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }

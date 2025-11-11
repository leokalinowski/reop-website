
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			typography: {
				DEFAULT: {
					css: {
						fontFamily: 'Inter, sans-serif',
						color: 'hsl(var(--foreground))',
						'--tw-prose-headings': 'hsl(var(--foreground))',
						'--tw-prose-links': 'hsl(var(--primary))',
						'--tw-prose-bold': 'hsl(var(--foreground))',
						'--tw-prose-counters': 'hsl(var(--muted-foreground))',
						'--tw-prose-bullets': 'hsl(var(--muted-foreground))',
						'--tw-prose-quotes': 'hsl(var(--muted-foreground))',
						h1: {
							fontSize: '2.5rem',
							fontWeight: '700',
							lineHeight: '1.2',
							marginTop: '2rem',
							marginBottom: '1rem',
						},
						h2: {
							fontSize: '2rem',
							fontWeight: '700',
							lineHeight: '1.3',
							marginTop: '2rem',
							marginBottom: '1rem',
						},
						h3: {
							fontSize: '1.5rem',
							fontWeight: '600',
							lineHeight: '1.4',
							marginTop: '1.5rem',
							marginBottom: '0.75rem',
						},
						h4: {
							fontSize: '1.25rem',
							fontWeight: '600',
							lineHeight: '1.4',
							marginTop: '1.5rem',
							marginBottom: '0.75rem',
						},
						p: {
							fontSize: '1.125rem',
							lineHeight: '1.75',
							marginTop: '1.25rem',
							marginBottom: '1.25rem',
						},
						a: {
							color: 'hsl(var(--primary))',
							textDecoration: 'underline',
							fontWeight: '500',
							'&:hover': {
								color: 'hsl(var(--primary))',
								opacity: '0.8',
							},
						},
						ul: {
							marginTop: '1.25rem',
							marginBottom: '1.25rem',
						},
						ol: {
							marginTop: '1.25rem',
							marginBottom: '1.25rem',
						},
						li: {
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
							fontSize: '1.125rem',
						},
						blockquote: {
							fontStyle: 'italic',
							borderLeftWidth: '4px',
							borderLeftColor: 'hsl(var(--primary))',
							paddingLeft: '1.5rem',
							marginTop: '1.5rem',
							marginBottom: '1.5rem',
							fontSize: '1.25rem',
						},
						code: {
							backgroundColor: 'hsl(var(--muted))',
							padding: '0.25rem 0.5rem',
							borderRadius: '0.25rem',
							fontSize: '0.875em',
						},
						strong: {
							fontWeight: '600',
						},
					},
				},
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				realEstate: {
					teal: 'hsl(184 100% 34%)',
					darkBlue: 'hsl(188 100% 21%)',
					green: 'hsl(74 61% 52%)',
					lightGray: 'hsl(210 20% 98%)',
					darkGray: 'hsl(0 0% 20%)',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
			'gradient-shift': {
				'0%': { backgroundPosition: '0% 50%' },
				'50%': { backgroundPosition: '100% 50%' },
				'100%': { backgroundPosition: '0% 50%' }
			},
			'slide-in-down': {
				'0%': { transform: 'translateY(-100%)', opacity: '0' },
				'100%': { transform: 'translateY(0)', opacity: '1' }
			}
			},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'float': 'float 6s ease-in-out infinite',
			'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
			'gradient-shift': 'gradient-shift 8s ease infinite',
			'slide-in-down': 'slide-in-down 0.3s ease-out'
		},
			fontFamily: {
				'inter': ['Inter', 'sans-serif']
			},
			letterSpacing: {
				'tighter': '-0.05em',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
} satisfies Config;

import {
	Container,
	Head,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
	Hr,
} from '@react-email/components'
import * as React from 'react'

/**
 * @param url Magic link URL
 */
export default function Email() {
	return (
		<Html>
			<Head>
				<title>Sign in to unistart</title>
			</Head>

			<Preview>Use the link below to verify your email address.</Preview>

			<Section style={main}>
				<Container style={body}>
					<Container style={container}>
						<Section>
							<Link
								href="https://unistart.io/?utm_medium=Email&utm_source=SignIn&utm_content=Link"
								target="_blank"
								style={{ display: 'inline-block' }}
							>
								<Img
									src="https://res.cloudinary.com/deln1tnfv/image/upload/v1677450853/Logo_Text_Glow_cjnryk.png"
									alt="UniStart logo"
									width="132"
									height="28"
									style={{ padding: '16px 0' }}
								/>
							</Link>
						</Section>

						<Text style={h1}>Sign in to unistart</Text>

						<Text style={h2}>
							Use the link below to verify your email address
						</Text>

						<Link style={cta} href="{{url}}" target="_blank">
							Sign in
						</Link>

						<Text style={text}>
							or copy and paste this URL into your browser:{' '}
							<Link href="{{url}}" target="_blank" style={link}>
								&#123;&#123;url&#125;&#125;
							</Link>
						</Text>

						<Hr style={hr} />

						<Text style={text}>
							If you did not request this you can safely ignore
							it.
							<br />
							<br />
							Something wrong?{' '}
							<Link
								href="https://airtable.com/shrn80ilQpefbmgSn"
								target="_blank"
								style={link}
							>
								Submit a ticket
							</Link>
						</Text>
					</Container>
				</Container>
			</Section>
		</Html>
	)
}

const main: React.CSSProperties = {
	margin: '0 auto',
	background: '#FFFFFF',
	fontFamily: 'arial, "helvetica neue",helvetica,sans-serif',
}

const body: React.CSSProperties = {
	border: '1px solid #d6d3d1',
	borderRadius: '8px',
	margin: '40px auto',
	width: '440px',
}

const container: React.CSSProperties = {
	padding: '20px',
	boxSizing: 'border-box',
}

const h1: React.CSSProperties = {
	fontWeight: '700',
	fontSize: '24px',
	lineHeight: '32px',
	margin: '16px 0 24px',
	color: '#1c1917',
}

const h2: React.CSSProperties = {
	fontSize: '16px',
	color: '#57534e',
	marginBottom: '32px',
}

const cta: React.CSSProperties = {
	display: 'inline-block',
	fontSize: '18px',
	color: '#FFFFFF',
	background: '#1d4ed8',
	borderRadius: '12px',
	lineHeight: '24px',
	textAlign: 'center',
	width: '100%',
	boxSizing: 'border-box',
	padding: '16px',
	marginBottom: '8px',
}

const text: React.CSSProperties = {
	fontSize: '14px',
	color: '#44403c',
	margin: '0px',
}

const link: React.CSSProperties = {
	color: '#1d4ed8',
	textDecoration: 'underline',
	wordBreak: 'break-all',
}

const hr: React.CSSProperties = {
	border: 'none',
	borderTop: '1px solid #d6d3d1',
	margin: '26px 0',
	width: '100%',
}

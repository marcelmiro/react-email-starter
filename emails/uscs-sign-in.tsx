import { Button } from '@react-email/button'
import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import * as React from 'react'

export default function Email() {
	return (
		<Html>
			<Head>
				<title>Sign in to uscstartups.io</title>
			</Head>

			<Preview>Use the link below to verify your email address.</Preview>

			<Section style={main}>
				<Container style={container}>
					<Container style={{ margin: '20px' }}>
						<Section style={{ marginTop: '32px' }}>
							<Img
								src="https://i.imgur.com/H8A8Q0F.png"
								alt="USC Startups"
								width="160"
								height="24"
							/>
						</Section>

						<Text style={h1}>Sign in to uscstartups.io</Text>

						<Text style={h2}>
							Use the link below to verify your email address
						</Text>

						<Button
							style={cta}
							href="{{verificationUrl}}"
							target="_blank"
						>
							Sign in
						</Button>

						<Text style={text}>
							or copy and paste this URL into your browser:{' '}
							<Link
								href="{{verificationUrl}}"
								target="_blank"
								style={link}
								rel="noopener noreferrer"
							>
								&#123;&#123;verificationUrl&#125;&#125;
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
								href="https://airtable.com/shrOoBDSahIZQRcPc"
								target="_blank"
								style={link}
								rel="noopener noreferrer"
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

const container: React.CSSProperties = {
	border: '1px solid #d6d3d1',
	borderRadius: '5px',
	margin: '40px auto',
	width: '440px',
}

const h1: React.CSSProperties = {
	fontWeight: '700',
	fontSize: '24px',
	lineHeight: '32px',
	margin: '32px 0 24px',
	color: '#1c1917',
}

const h2: React.CSSProperties = {
	fontSize: '16px',
	color: '#57534e',
	marginBottom: '32px',
}

const text: React.CSSProperties = {
	fontSize: '14px',
	color: '#44403c',
}

const cta: React.CSSProperties = {
	fontSize: '18px',
	color: '#FFFFFF',
	background: '#1d4ed8',
	borderRadius: '8px',
	lineHeight: '24px',
	textAlign: 'center',
	width: '100%',
	boxSizing: 'border-box',
	padding: '16px',
}

const link: React.CSSProperties = {
	color: '#1d4ed8',
	textDecoration: 'none',
}

const hr: React.CSSProperties = {
	border: 'none',
	borderTop: '1px solid #d6d3d1',
	margin: '26px 0',
	width: '100%',
}

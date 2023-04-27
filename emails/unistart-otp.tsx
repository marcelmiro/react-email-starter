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
 * @param code One-time password code
 */
export default function Email() {
	return (
		<Html>
			<Head>
				<title>Sign in to unistart</title>
			</Head>

			<Preview>Copy the code below to verify your email address.</Preview>

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

						<Text style={h1}>Sign in to UniStart</Text>

						<Text style={text}>
							Copy the following code to verify your email
							address. Note that this code is a one-time use only
							and will expire in 1 hour.
						</Text>

						<Section style={codeContainer}>
							<Text style={code}>
								&#123;&#123;code&#125;&#125;
							</Text>
						</Section>

						<Hr style={hr} />

						<Text style={text}>
							Please{' '}
							<Link
								href="https://airtable.com/shrOoBDSahIZQRcPc"
								target="_blank"
								style={link}
							>
								submit a ticket
							</Link>{' '}
							if you did not request this code.
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

const codeContainer: React.CSSProperties = {
	background: 'rgba(0,0,0,.05)',
	borderRadius: '6px',
	margin: '16px auto 14px',
	verticalAlign: 'middle',
	width: '280px',
}

const code: React.CSSProperties = {
	color: '#1c1917',
	fontSize: '32px',
	fontWeight: 700,
	letterSpacing: '6px',
	lineHeight: '40px',
	paddingBottom: '8px',
	paddingTop: '8px',
	margin: '0 auto',
	width: '100%',
	textAlign: 'center',
}

const text: React.CSSProperties = {
	fontSize: '14px',
	color: '#44403c',
	margin: '0px',
}

const link: React.CSSProperties = {
	color: '#1d4ed8',
	textDecoration: 'underline',
}

const hr: React.CSSProperties = {
	border: 'none',
	borderTop: '1px solid #d6d3d1',
	margin: '26px 0',
	width: '100%',
}

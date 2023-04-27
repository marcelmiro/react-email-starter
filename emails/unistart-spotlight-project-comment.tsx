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
 * @param projectName Spotlight project name
 * @param projectUrl Spotlight project URL
 * @param commenter Full name or username of person that left a comment
 * @param comment Content of comment
 */
export default function Email() {
	return (
		<Html>
			<Head>
				<title>Someone commented on your Spotlight project!</title>
			</Head>

			<Preview>
				&#123;&#123;commenter&#125;&#125; has commented
				&#123;&#123;projectName&#125;&#125;
			</Preview>

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

						<Text style={h1}>
							&#123;&#123;commenter&#125;&#125; has commented{' '}
							<Link
								href="{{projectUrl}}"
								target="_blank"
								style={link}
							>
								&#123;&#123;projectName&#125;&#125;
							</Link>
						</Text>

						<Text style={comment}>
							&#123;&#123;comment&#125;&#125;
						</Text>

						<Link style={cta} href="{{projectUrl}}" target="_blank">
							Reply
						</Link>

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
							if you believe you shouldn&apos;t have received this
							email.
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

const comment: React.CSSProperties = {
	background: '#f5f5f4',
	color: '#a8a29e',
	padding: '8px',
	fontSize: '16px',
	marginBottom: '24px',
	borderRadius: '4px',
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

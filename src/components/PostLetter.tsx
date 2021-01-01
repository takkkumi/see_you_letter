import { Form, Button, Icon, Modal } from "semantic-ui-react"
import { useContext, useState } from "react"
import { UserContext } from "../pages/_app"
import { postLetter } from "../actions/postLetter"

const PostLetter = () => {
	const user = useContext(UserContext).storeUser.data
	const [letter, setLetter] = useState("")
	const [modalOpen, setModalOpen] = useState(false)
	const [nestedModalOpen, setNestedModalOpen] = useState(false)

	const handleChange = (
		event: React.FormEvent<HTMLTextAreaElement>
	): void => {
		setLetter(event.currentTarget.value)
	}
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		setNestedModalOpen(true)
		event.preventDefault()
	}
	const HandlenestedModalClose = () => {
		setNestedModalOpen(false)
		setModalOpen(false)
	}

	return (
		<>
			<Button
				animated="fade"
				size="huge"
				basic
				onClick={() => setModalOpen(true)}>
				<Button.Content style={{ opacity: modalOpen && 0 }} visible>
					Dear future you
				</Button.Content>
				<Button.Content style={{ opacity: modalOpen && 0 }} hidden>
					<Icon name="mail" />
				</Button.Content>
			</Button>
			<Modal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				size="large"
				dimmer="blurring">
				<Form onSubmit={(e) => handleSubmit(e)} size="huge">
					<Form.TextArea
						label="Dear future you"
						placeholder="Write your letter"
						value={letter}
						onChange={(e) => handleChange(e)}
					/>
					<Form.Button
						content="See you letter again"
						disabled={!letter}
					/>
				</Form>
				<Modal
					open={nestedModalOpen}
					onClose={() => HandlenestedModalClose()}>
					<Modal.Header>OK?</Modal.Header>
					<Modal.Content>
						<p
							style={{
								fontFamily: "sans-serif",
								whiteSpace: "pre-wrap",
							}}>
							{letter}
						</p>
						<Button onClick={() => setNestedModalOpen(false)}>
							Edit
						</Button>
						<Button
							onClick={async () => {
								await postLetter(user.uid, letter)
								HandlenestedModalClose()
							}}>
							Post
						</Button>
					</Modal.Content>
				</Modal>
			</Modal>
		</>
	)
}

export default PostLetter

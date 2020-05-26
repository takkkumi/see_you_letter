import { Form, Container, Button, Icon } from "semantic-ui-react"
import { useContext, useState } from "react"
import { UserContext } from "../pages/_app"
import { Modal } from "semantic-ui-react"
import firebase, { auth } from "firebase/app"
import "firebase/firestore"
import { format } from "date-fns"
import ja from "date-fns/locale/ja"
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
		console.log(sendingDay)
		event.preventDefault()
	}
	const HandlenestedModalClose = () => {
		setNestedModalOpen(false)
		setModalOpen(false)
	}

	const today = new Date()
	const later = 7
	const sendingDay = today.getDate() + later
	return (
		<Container>
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
						<p>{letter}</p>
						<Button onClick={() => setNestedModalOpen(false)}>
							Edit
						</Button>
						<Button
							onClick={async () => {
								HandlenestedModalClose()
								postLetter({
									userUid: user.uid,
									text: letter,
								})
							}}>
							Post
						</Button>
					</Modal.Content>
				</Modal>
			</Modal>
		</Container>
	)
}

export default PostLetter

import React, { Component } from 'react';
import { Col, Card, CardBlock, CardTitle, Button } from 'reactstrap';
import EditIntegrationModalForm from '../forms/EditIntegrationModalForm';
import IntegrationInstructionsTeamworkModal from './../misc/IntegrationInstructionsTeamworkModal';
import IntegrationInstructionsTrelloModal from './../misc/IntegrationInstructionsTrelloModal';

export default class IntegrationCard extends Component {
	constructor() {
		super();
		this.state = { modal : false, instructionsModal : false };
	}
	toggleModal = () => this.toggleState('modal');
	toggleInstructionsModal = () => this.toggleState('instructionsModal');
	toggleState = (name) => this.setState({ [name] : !this.state[name] })
	render() {
		const { integration } = this.props;
		return (
			<Col lg={3} md={4} sm={6} xs={6}>
				<Card className={`integration-card ${integration.service}`}>
					<CardBlock className='card-body'>
						<CardTitle>{integration.name}</CardTitle>
						<div className='integration-service text-center'>
							<span>{integration.service}</span>
						</div>
						<div className='integration-author'>{integration.created_by.full_name}</div>
						<div className='text-center'>
							<Button className='view-details' onClick={this.toggleModal}>
								View details
							</Button>
							<Button className='view-instructions' onClick={this.toggleInstructionsModal}>
								Instructions
							</Button>
						</div>
						<div className='integration-id text-center'>ID: {integration._id}</div>
					</CardBlock>
				</Card>
				
				<EditIntegrationModalForm show={this.state.modal} 
					toggle={this.toggleModal} integration={integration} />

				{ integration.service === 'trello' && 
					<IntegrationInstructionsTrelloModal show={this.state.instructionsModal}
						toggle={this.toggleInstructionsModal} integration={integration} />
				}
				{ integration.service === 'teamwork' && 
					<IntegrationInstructionsTeamworkModal show={this.state.instructionsModal}
						toggle={this.toggleInstructionsModal} integration={integration} />
				}

			</Col>
		)
	}
}
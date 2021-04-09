import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Icon from './../../misc/Icon';

export default function UserInfoCard(props) {
	const { user } = props;
	return (
		<Card className='user-info-card'>
			<CardBody>
				<Row>
					<Col xs={12} md={{ size: 4, offset: 1 }}>
						{ user.profile_image &&
							<div className='profile-image-preview'>
								<img src={user.profile_image} alt=""/>
							</div>
						}
					</Col>
					<Col xs={12} md={7}>
						<div className='user-info'>
							<p className="user-info__full-name">{ user.full_name }</p>
							<p className="user-info__email"><Icon fa-envelope />{ user.email }</p>
							<p className="user-info__slack"><Icon fa-slack />{ user.slack_account }</p>
							<p className="user-info__trello"><Icon fa-trello />{ user.trello_account }</p>
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}

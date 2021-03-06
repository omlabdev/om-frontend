import React, { Component } from 'react';
import { Col, Card, CardBody, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/billing';
import Icon from '../../misc/Icon';
import CreateInvoiceCta from '../misc/CreateInvoiceCta';

class BillingOpportunities extends Component {
	componentWillMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchProjectsBillingIfNeeded();
	}
	
	getProjectsWithUnpaidWork() {
		if (!this.props.projects) return [];
		return this.props.projects.filter(p => {
			if (p.hours_sold_unit !== 'total') return false;
			return p.executed_hours_total > p.billed_hours_total;
		})
	}

	getBillingOpportunities() {
		return this.getProjectsWithUnpaidWork()
			.map(p => [p, Math.round((p.executed_hours_total - p.billed_hours_total) * p.hourly_rate)])
			.filter(([p, profit]) => profit > 0)
	}
	
	getInvoiceTemplate(project, amount) {
		return {
			project: project._id,
			amount: amount,
			description: 'Development services',
			billed_hours: Math.round(amount / project.hourly_rate)
		}
	}

	render() {
		return (
			<Card className='opportunities-card list spaced'>
				<CardBody >
					<CardTitle>Billing <b>opportunities</b></CardTitle>
					<ul>
						{ this.getBillingOpportunities().map(([p, profit]) => {
							return (
								<li key={p._id} className='row'>
									<Col xs={6}><b>{p.name}</b></Col>
									<Col xs={4} className='text-right'>
										<Icon fa-dollar /> {profit}
									</Col>
									<Col xs={2}>
										<CreateInvoiceCta {...this.getInvoiceTemplate(p, profit)} />
									</Col>
								</li>
							)
						}) }
					</ul>
					<p className='reference'>
						A billing opportunity means that the team has worked on a project 
						more hours than billed as today.
					</p>
				</CardBody>
			</Card>
		)
	}
}

const mapStateToProps = state => { return {
	projects: Object.values(state.billingView.projectsBilling.projectsById).filter(p => p.active)
}}

const mapDispatchToProps = dispatch => { return {
	fetchProjectsBillingIfNeeded : () => dispatch(fetchProjectsBillingIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(BillingOpportunities);
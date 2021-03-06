import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProjectsBillingIfNeeded } from '../../../actions/billing';

class UnpaidInvoicesCard extends Component {
	componentWillMount() {
		this.props.fetchProjectsBillingIfNeeded();
	}
	componentWillReceiveProps(props) {
		this.props.fetchProjectsBillingIfNeeded();
	}
	getUnpaidInvoices() {
		if (!this.props.projectsById) return [];
		return Object.values(this.props.projectsById)
			.map(p => p.invoices)
			.reduce((all, is) => all.concat(is), [])
			.filter(i => !i.paid );
	}
	render() {
		const invoices = this.getUnpaidInvoices();
		const count = invoices.length;
		const toBe = count === 1 ? 'is' : 'are';
		const singular_plural = 'invoice' + (count === 1 ? '' : 's');
		return (
			<Card className='unpaid-card spaced'>
				<CardBody className='text-center'>
					<CardTitle><b>Unpaid</b></CardTitle>
					{ count === 0 && <p>There are no unpaid invoices</p> }
					{ count > 0 && <p>There {toBe} <b>{count}</b> unpaid {singular_plural}</p> }
				</CardBody>
			</Card>
		)
	}
}

const mapStateToProps = state => ({
	projectsById: state.billingView.projectsBilling.projectsById
})

const mapDispatchToProps = dispatch => { return {
	fetchProjectsBillingIfNeeded : () => dispatch(fetchProjectsBillingIfNeeded())
}}

export default connect(mapStateToProps, mapDispatchToProps)(UnpaidInvoicesCard);
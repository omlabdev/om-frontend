import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import BillingOverviewCard from  './BillingOverviewCard';
import moment from 'moment';

export default class BillingOverviewCards extends Component {
	render() {
		const { objective, invoices } = this.props;
		const billingInvoices = invoices.filter( i => i.direction === 'out' );

		return (
			<div className='overview-billing-cards year-month'>
				<Row className='row-eq-height'>
					<Col xs={6} lg={12}>
						<BillingOverviewCard
							className='year-objective-card'
							amount={objective}
							title={'<b>Year</b> objective'} />
					</Col>
					<Col xs={6} lg={12}>
						<BillingOverviewCard
							className='year-actual-card'
							amount={this.getTotalYearBilling( billingInvoices )}
							title={'<b>Year</b> actual'} />
					</Col>
					<Col xs={6} lg={12}>
						<BillingOverviewCard
							className='monthly-objective-card smaller-title'
							amount={ Math.round( objective / 12 )}
							title={'<b>Monthly</b> objective'} />
					</Col>
					<Col xs={6} lg={12}>
						<BillingOverviewCard
							className='monthly-avg-card smaller-title'
							amount={this.getAvgMonthlyBilling( billingInvoices )}
							title={'<b>Monthly</b> avg'} />
					</Col>
				</Row>
			</div>
		);
	}

	getTotalYearBilling = ( invoices ) => (
		Math.round( invoices.reduce( ( a,i ) => a + i.amount, 0 ) ) )

	getAvgMonthlyBilling = ( invoices ) => {
		const { start, end } = this.props;
		const total = this.getTotalYearBilling( invoices );

		// if end is in the current year, use current month instead of
		// december to get the real monthly avg so far
		let realEnd = end;
		if ( realEnd.format( 'YYYY' ) === moment().format( 'YYYY' ) ) {
			realEnd = moment();
		}

		const monthsOfData = parseInt( realEnd.diff( start, 'months', true ) + 1, 10 );

		return Math.round( total / monthsOfData );
	}
}

import React, {Component, Fragment} from 'react';
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { domain } from '../package'
import Layout from '@component/layout'


export { Router, withRouter, Link, axios, Layout, domain, React, Component, Fragment }

export const _isPhone = text => {
	return /^[1][3,4,5,7,8][0-9]{9}$/.test(text) ? true : false;
}
export const _isPwd = text => {
	return /^(\w){6,20}$/.test(text) ? true : false;
}
export const _hidePhone = text => {
	if (typeof text != 'string') return;
	return text.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
}


